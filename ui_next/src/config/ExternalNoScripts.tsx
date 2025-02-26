import React from "react";


const ExternalNoScripts: React.FC<{}> = () => {
    return (
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-MWWFJBPW"
                height="0"
                width="0"
                style={{display: 'none', visibility: 'hidden'}}
            ></iframe>
        </noscript>
    );
}

export default ExternalNoScripts;
