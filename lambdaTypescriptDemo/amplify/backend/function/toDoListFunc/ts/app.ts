
/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_TYPESCRIPTDEMO_ARN
    STORAGE_TYPESCRIPTDEMO_NAME
    STORAGE_TYPESCRIPTDEMO_STREAMARN
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



import AWS from 'aws-sdk';
import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

AWS.config.update({ region: "ap-southeast-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});

//mvc
import {ToDoListFuncService} from "./service";
import {ToDoListFuncController} from './controller';
const toDoListFuncService = new ToDoListFuncService(docClient);
export const toDoListFuncController = new ToDoListFuncController(toDoListFuncService);

import {toDoListRoutes} from "./router";
app.use(toDoListRoutes);

app.listen(3000, function () {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
