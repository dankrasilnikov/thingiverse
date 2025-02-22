import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {SpeedInsights} from '@vercel/speed-insights/react';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App/>
        <SpeedInsights/>
    </React.StrictMode>
);

reportWebVitals();
