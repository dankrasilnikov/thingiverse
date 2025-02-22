const express = require('express');
const { exec } = require('child_process');
const url = require('url');
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const https = require('https');

const app = express();
const port = 3535;

const projectDir = __dirname;
const logDir = path.join(os.tmpdir(), 'cura-agent-logs');
const downloadDir = path.join(os.tmpdir(), 'cura-agent-downloads');

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

const logFile = path.join(logDir, 'cura-agent.log');
function log(msg, ...args) {
    console.log(msg, ...args);
    fs.appendFileSync(logFile, `${new Date().toISOString()} - ${msg} ${args.join(' ')}\n`);
}

process.on('uncaughtException', (err) => {
    fs.appendFileSync(logFile, `${new Date().toISOString()} - Uncaught Exception: ${err.stack}\n`);
    console.error(err);
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    fs.appendFileSync(logFile, `${new Date().toISOString()} - Unhandled Rejection: ${reason}\n`);
    console.error(reason);
    process.exit(1);
});

async function downloadFile(fileUrl) {
    return new Promise((resolve, reject) => {
        const parsedUrl = new URL(fileUrl);
        const protocol = parsedUrl.protocol === 'https:' ? https : http;
        const fileName = path.basename(parsedUrl.pathname) || `temp_${Date.now()}.stl`;
        const localPath = path.join(downloadDir, fileName);
        const fileStream = fs.createWriteStream(localPath);
        protocol.get(fileUrl, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Request Failed. Status Code: ${res.statusCode}`));
                return;
            }
            res.pipe(fileStream);
            fileStream.on('finish', () => fileStream.close(() => resolve(localPath)));
        }).on('error', (err) => {
            fs.unlink(localPath, () => {});
            reject(err);
        });
    });
}

async function launchCura(file, settings, callback) {
    let localFile = file;
    if (/^https?:\/\//i.test(file)) {
        try {
            log(`Downloading: ${file}`);
            localFile = await downloadFile(file);
            log(`Downloaded: ${localFile}`);
        } catch (err) {
            return callback(err);
        }
    }
    const curaPath = `"C:\\Program Files\\UltiMaker Cura 5.9.1\\UltiMaker-Cura.exe"`;
    const command = `cmd /c start "" ${curaPath} "${localFile}"`;
    log(`Execute: ${command}`);
    exec(command, (error, stdout) => {
        if (error) return callback(error);
        callback(null, stdout);
    });
}

if (process.argv[2]) {
    (async () => {
        log("process.argv:", process.argv.join(' '));
        const parsed = url.parse(process.argv[2], true);
        if (parsed.hostname === 'print') {
            const { file, settings } = parsed.query;
            log(`Protocol: file=${file}, settings=${settings}`);
            launchCura(file, settings, (err, output) => {
                if (err) {
                    log("Finished with error:", err);
                    process.exit(1);
                } else {
                    log("Finished successfully.");
                    process.exit(0);
                }
            });
        }
    })();
} else {
    app.get('/print', (req, res) => {
        const { file, settings } = req.query;
        log(`HTTP: file=${file}, settings=${settings}`);
        launchCura(file, settings, (err, output) => {
            if (err) return res.status(500).send(`Error: ${err.message}`);
            res.send(`Cura launched: ${output}`);
        });
    });
    app.listen(port, () => log(`Local port: ${port}`));
}
