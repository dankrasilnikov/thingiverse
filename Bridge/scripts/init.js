const { exec } = require('child_process');
const path = require('path');

const agentPath = path.resolve(__dirname, '../output/cura-agent.exe');
console.log(agentPath);
const regCommand = `reg add "HKCR\\curademo" /ve /d "URL:Curademo Protocol" /f && reg add "HKCR\\curademo" /v "URL Protocol" /d "" /f && reg add "HKCR\\curademo\\shell\\open\\command" /ve /d "\\"${agentPath}\\" \\"%1\\"" /f`;

exec(regCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error registering protocol: ${error.message}`);
    } else {
        console.log('Protocol "curademo://" successfully registered.');
    }
});
