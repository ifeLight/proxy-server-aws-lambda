import serverlessExpress from "@vendia/serverless-express";
import { APIGatewayEvent, Context } from 'aws-lambda';
import app from './app';

// const binaryMimeTypes = [
// 	'application/octet-stream',
// 	'font/eot',
// 	'font/opentype',
// 	'font/otf',
// 	'image/jpeg',
// 	'image/png',
// 	'image/svg+xml'
// ]

// const server = awsServerlessExpress.createServer(app, undefined, binaryMimeTypes);

// export const handler = async (event: APIGatewayEvent, context: Context) => {
//     return awsServerlessExpress.proxy(server, event, context);
// 	// let response;
// 	// try {
// 	// 	response = {
// 	// 	  statusCode: 200,
// 	// 	  body: JSON.stringify({
// 	// 		message: "hello world",
// 	// 	  }),
// 	// 	};
// 	//   } catch (err) {
// 	// 	console.log(err);
// 	// 	return err;
// 	//   }
	 
// 	//   return response;
// } 

export const handler = serverlessExpress({ app });