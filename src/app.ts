import express from 'express';
import axios from 'axios';
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
    ws: false, // proxy websockets
}));

// Create a Manual Proxy Server to a target server
// app.use('/', (req, res) => {
//     const url = target + req.url;
//     console.log('Proxying to ' + url);
//     axios({
//         method: req.method as any,
//         url,
//         data: req.body,
//         headers: {
//             ...req.headers,
//             // host: new URL(target).host,
//         },
//         responseType: 'stream'
//     }).then((response) => {
//         response.data.pipe(res);
//     }).catch((err) => {
//         console.log(err);
//     });
// });
    

export default app;