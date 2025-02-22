const { exec } = require('child_process');
const path = require('path');

const agentPath = path.resolve(__dirname, '../output/cura-agent.exe');
console.log(agentPath);
const regCommand = `reg add "HKCR\\cura" /ve /d "URL:Cura Protocol" /f && reg add "HKCR\\cura" /v "URL Protocol" /d "" /f && reg add "HKCR\\cura\\shell\\open\\command" /ve /d "\\"${agentPath}\\" \\"%1\\"" /f`;

exec(regCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error registering protocol: ${error.message}`);
    } else {
        console.log('Protocol "cura://" successfully registered.');
    }
});
