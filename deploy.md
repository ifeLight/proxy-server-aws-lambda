# Deployment

To deploy the project, you will need to have the following:

1. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
2. [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)
3. [AWS Lambda execution role](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html)

## To deploy the project

Copy the `.aws/sample-aws-credentials` to the home directory using `cp .aws/sample-aws-credentials ~/.aws/credentials` and open the `~/.aws/credentials` file and replace the `aws_access_key_id` and `aws_secret_access_key` with the access key ID and secret access key of the IAM user you created.

**Go to the home directory of the project and open the terminal.**

### Option 1

Run the following command

```bash
npm run deploy --name=<<the function name>> --role=<<the role>> --region=<<the region>>
```

1. Replace the `<<the role>>` with the ARN of the execution role you created in step 2 of the prerequisites. The ARN looks like this `arn:aws:iam::123456789012:role/lambda-ex`, for more information on how to get the ARN of the execution role, see [here](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html).
2. Replace the `<<the region>>` with the region you want to deploy to. (e.g. `us-east-1`, `us-west-2`, `eu-central-1` etc.)
3. Replace the `<<the function name>>` with the name you want to give the function. (e.g. `proxy-server`)
4. Copy the URL at then end of the output and paste it in your browser to see the website you are proxying.

### Option 2

1. Set the following variables

```bash
FUNCTION_ROLE=<<the role>>
REGION=<<the region>>
FUNCTION_NAME=<<the function name>>
```

Replace:

- The `<<the role>>` with the ARN of the execution role you created in step 2 of the prerequisites. The ARN looks like this `arn:aws:iam::123456789012:role/lambda-ex`, for more information on how to get the ARN of the execution role, see [here](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html).
- The `<<the region>>` with the region you want to deploy to. (e.g. `us-east-1`, `us-west-2`, `eu-central-1` etc.)
- The `<<the function name>>` with the name you want to give the function. (e.g. `proxy-server`)

And run the following command

```bash
aws lambda create-function --function-name $FUNCTION_NAME --runtime "nodejs16.x" --role $FUNCTION_ROLE --zip-file "fileb://dist/index.zip" --handler index.handler --region $REGION  --output text && aws lambda create-function-url-config --function-name $FUNCTION_NAME --auth-type NONE --cors '{"AllowOrigins":["*"], "AllowHeaders": ["*"], "AllowMethods": ["*"]}' --region $REGION && aws lambda add-permission --function-name $FUNCTION_NAME --action lambda:invokeFunctionUrl --principal "*" --output text --statement-id sample0-statement --region $REGION --function-url-auth-type NONE
```

To get the **url** of the function, run the following command

```bash
aws lambda get-function-url-config --function-name $FUNCTION_NAME --region $REGION --query FunctionUrl --output text
```

Copy the URL at then end of the output and paste it in your browser to see the website you are proxying.

### Option 3

You will have to install the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) and [Docker](https://docs.docker.com/get-docker/) on your machine.

This is the most straightforward option if all the prerequisites are met and the user has the required permissions. A root user or a user with the required permissions will have to run the following command:

- Build the project

```bash
npm run build:sam
```

- To test by accessing the function locally, run the following command

```bash
npm run start:sam
```

- To deploy the project, run the following command

```bash
 npm run deploy:sam --name=<<the function>> --region=<<the region>>
```

1. Replace the `<<the region>>` with the region you want to deploy to. (e.g. `us-east-1`, `us-west-2`, `eu-central-1` etc.)
2. Replace the `<<the function name>>` with the name you want to give the function. (e.g. `proxy-server`)
3. Copy the URL at then end of the output and paste it in your browser to see the website you are proxying.

**NOTE**: As at the time of writing, the AWS API Gateway do not support Chunnked Transfer *Encoding*. 
