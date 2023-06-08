import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayEvent, Context } from 'aws-lambda';
import app from './app';

const binaryMimeTypes = [
	'application/octet-stream',
	'font/eot',
	'font/opentype',
	'font/otf',
	'image/jpeg',
	'image/png',
	'image/svg+xml'
]

const server = awsServerlessExpress.createServer(app, undefined, binaryMimeTypes);

export const handler = async (event: APIGatewayEvent, context: Context) => {
    return awsServerlessExpress.proxy(server, event, context);
} 