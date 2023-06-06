# Proxy Server for AWS Lambda

This is a proxy server for AWS Lambda. It is designed to be used with the ClaudiaJS framework, but can be used with any AWS Lambda function.

## Getting Started

### Prerequisites

1. You will need to have NodeJS installed on your machine. You can download it from [here](https://nodejs.org/en/download/).
2. You will need to have an AWS account. You can sign up for one [here](https://aws.amazon.com/).
3. You will need tohave an AWS IAM user with programmatic access. You can create one [here](https://console.aws.amazon.com/iam/home?region=us-east-1#/users$new?step=details).

### Installing

1. Clone this repository to your local machine using `git clone https://github.com/ifeLight/proxy-server-aws-lambda.git proxy-server-aws-lambda`
2. Change into the directory using `cd proxy-server-aws-lambda`
3. Install the dependencies using `npm install`
4. Copy the `config.sample.json` file to `config.json` using `cp config.sample.json config.json`
5. Open the `config.json` and and change `https://www.google.com/` to the URL of the website you want to proxy.
6. Run the server using `npm start` 
7. Open your browser and navigate to `http://localhost:8080/` to see the website you are proxying.

### Testing

To run the tests, run `npm test`. If no errors are displayed, then the tests have passed.

## Deployment

1. Before deployment you will need to have an AWS IAM user with programmatic access. You can create one [here](https://console.aws.amazon.com/iam/home?region=us-east-1#/users$new?step=details).
2. The user has to have Full Access to AWS Lambda and API Gateway.
3. You will need to have the AWS CLI installed on your machine. You can download it from [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html). (Optional)
4. The copy the `.aws/sample-aws-credentials` file to `.aws/credentials` using `cp .aws/sample-aws-credentials .aws/credentials`.
5. Open the `.aws/credentials` file and replace the `aws_access_key_id` and `aws_secret_access_key` with the access key ID and secret access key of the IAM user you created in step 1.

To deploy the server to AWS Lambda, run `npm run deploy`. This will create a new Lambda function and API Gateway endpoint. You can then use the URL of the API Gateway endpoint to access the website you are proxying. Then copy the URL and paste it into your browser.
