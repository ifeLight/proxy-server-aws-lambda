import fs from 'fs';
import path from 'path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import config from './config.json';

// const configPath = path.resolve(__dirname, '../config.json');
// const sampleConfigPath = path.resolve(__dirname, '../config.sample.json');
// let config = {};

// if (!fs.existsSync(configPath)) {
//     config = JSON.parse(fs.readFileSync(sampleConfigPath, 'utf8'));
// } else {
//     config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
// }

const app = express();

//@ts-ignore
const target = config['target-proxy'] || 'https://www.google.com';

app.use( createProxyMiddleware({ 
    target, 
    changeOrigin: true,
    ws: true, // proxy websockets
}));

export default app;