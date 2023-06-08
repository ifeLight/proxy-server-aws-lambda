# Proxy Server for AWS Lambda

This is a proxy server on AWS using Lambda and API Gateway. It is a simple proxy server that proxies a website and returns the response to the client.

## Getting Started

### Prerequisites

1. You will need to have NodeJS installed on your machine. You can download it from [here](https://nodejs.org/en/download/).
2. You will need to have an AWS account. You can sign up for one [here](https://aws.amazon.com/).
3. You will need tohave an AWS IAM user with programmatic access. You can create one [here](https://console.aws.amazon.com/iam/home?region=us-east-1#/users$new?step=details).
4. You will need to instal the AWS CLI on your machine. You can download it from [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html). (Mandatory for deployment)

### Installing

1. Clone this repository to your local machine using `git clone https://github.com/ifeLight/proxy-server-aws-lambda.git proxy-server-aws-lambda`
2. Change into the directory using `cd proxy-server-aws-lambda`
3. Install the dependencies using `npm install`
4. Copy the `config.sample.json` file to `src/config.json` using `cp config.sample.json src/config.json`
5. Open the `config.json` and and change `https://www.google.com/` to the URL of the website you want to proxy.
6. Run the server using `npm start`.
7. Open your browser and navigate to `http://localhost:8080/` to see the website you are proxying.

### Testing

To run the tests, run `npm test`. If no errors are displayed, then the tests have passed.

## Deployment

1. Before deployment you will need to have an AWS IAM user with programmatic access. You can create one [here](https://console.aws.amazon.com/iam/home?region=us-east-1#/users$new?step=details).
2. The user has to have Full Access to AWS Lambda and API Gateway and most especially the execution role of the Lambda function. [Here](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html#permissions-executionrole-console) is a guide on how to create an execution role for a Lambda function.
3. Ensure you have added `AWSXRayDaemonWriteAccess` and `AWSLambdaBasicExecutionRole` permissions.
4. You will need to have the AWS CLI installed on your machine. You can download it from [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html). (Mandatory for deployment)
5. The copy the `.aws/sample-aws-credentials` to the home directory using `cp .aws/sample-aws-credentials ~/.aws/credentials`
6. Open the `~/.aws/credentials` file and replace the `aws_access_key_id` and `aws_secret_access_key` with the access key ID and secret access key of the IAM user you created in step 1.

To deploy the server to AWS Lambda, you will run on your terminal at the home directory of the project:

```bash
aws lambda create-function --function-name <<the function name>> --runtime "nodejs16.x" --role <<the role>> --zip-file "fileb://dist/index.zip" --handler index.handler --region <<the region>>
```

Replace:

1. `<<the role>>` with the ARN of the execution role you created in step 2 of the prerequisites. The ARN looks like this `arn:aws:iam::123456789012:role/lambda-ex`, for more information on how to get the ARN of the execution role, see [here](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html).s
2. `<<the region>>` with the region you want to deploy to. (e.g. `us-east-1`, `us-west-2`, `eu-central-1` etc.)
3. `<<the function name>>` with the name you want to give the function. (e.g. `proxy-server`)

You will get a response simillar to this:

```json
{
    "FunctionName": "proxy-server2",
    "FunctionArn": "arn:aws:lambda:eu-central-1:965800799013:function:proxy-server2",
    "Runtime": "nodejs16.x",
    "Role": "arn:aws:iam::965800799013:role/service-role/proxy-server-role-w1rt0ybq",
    "Handler": "index.handler",
    "CodeSize": 860277,
    "Description": "",
    "Timeout": 3,
    "MemorySize": 128,
    "LastModified": "2023-06-08T12:55:20.009+0000",
    "CodeSha256": "28/ir181RyRq3SujMEe37Fw/xjRH1jGH6vf6a3DfC4I=",
    "Version": "$LATEST",
    "TracingConfig": {
        "Mode": "PassThrough"
    },
    "RevisionId": "d418c63d-b019-4dba-818e-91a4cd2da383",
    "State": "Pending",
    "StateReason": "The function is being created.",
    "StateReasonCode": "Creating",
    "PackageType": "Zip",
    "Architectures": [
        "x86_64"
    ],
    "EphemeralStorage": {
        "Size": 512
    },
    "SnapStart": {
        "ApplyOn": "None",
        "OptimizationStatus": "Off"
    }
}
```

Take note of the `FunctionArn` and `FunctionName` as you will need them in the next step.

To get the Function url, you will run on your terminal at the home directory of the project:

```bash
aws lambda create-function-url-config --function-name <<the function name>> --auth-type NONE --cors '{"AllowOrigins":["*"], "AllowHeaders": ["*"], "AllowMethods": ["*"]}' --region <<the region>>
```

Replace:

1. `<<the region>>` with the region you want to deploy to. (e.g. `us-east-1`, `us-west-2`, `eu-central-1` etc.)
2. `<<the function name>>` with the name you gave the function in the previous step. (e.g. `proxy-server`)

This will create a lambad function url and with a repsonse similar to this:

```json
{
    "FunctionUrl": "https://ckycrb5ojxgjfepz7mg3cmfki40nlqbk.lambda-url.us-east-1.on.aws/",
    "FunctionArn": "arn:aws:lambda:us-east-1:965800799013:function:proxy-server",
    "AuthType": "NONE",
    "CreationTime": "2023-06-08T13:20:18.244654Z"
}
```

The url is the `FunctionUrl` in the response above. But you have to give public access to the function url. To do this, you will run on your terminal at the home directory of the project:

```bash
aws lambda add-permission --function-name <<the function name>> --action lambda:invokeFunctionUrl --principal "*" --output text --statement-id sample0-statement --region <<the region>> --function-url-auth-type NONE
```

Replace:

1. `<<the region>>` with the region you want to deploy to. (e.g. `us-east-1`, `us-west-2`, `eu-central-1` etc.)
2. `<<the function name>>` with the name you gave the function in the previous step. (e.g. `proxy-server`)

If successful, you will get a response similar to this:

```json
{"Sid":"sample0-statement","Effect":"Allow","Principal":"*","Action":"lambda:invokeFunctionUrl","Resource":"arn:aws:lambda:eu-central-1:965800799013:function:proxy-server3","Condition":{"StringEquals":{"lambda:FunctionUrlAuthType":"NONE"}}}
```

After all, you can now access the website using the function url. (e.g. `https://ckycrb5ojxgjfepz7mg3cmfki40nlqbk.lambda-url.us-east-1.on.aws/`)

For a faster way to deploy, you can use visit the [Deploy readme](deploy.md).

```bash
