import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const target = process.env.PROXY_TARGET || 'https://www.google.com';

app.use( createProxyMiddleware({ 
    target, 
    changeOrigin: true,
    ws: true, // proxy websockets
}));

export default app;