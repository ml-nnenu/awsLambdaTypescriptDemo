"use strict";
/* Amplify Params - DO NOT EDIT
    ENV
    REGION
    STORAGE_TYPESCRIPTDEMO_ARN
    STORAGE_TYPESCRIPTDEMO_NAME
    STORAGE_TYPESCRIPTDEMO_STREAMARN
Amplify Params - DO NOT EDIT */ /*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDoListFuncController = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const middleware_1 = __importDefault(require("aws-serverless-express/middleware"));
aws_sdk_1.default.config.update({ region: "ap-southeast-1" });
const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient();
// declare a new express app
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(middleware_1.default.eventContext());
// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
//mvc
const service_1 = require("./service");
const controller_1 = require("./controller");
const toDoListFuncService = new service_1.ToDoListFuncService(docClient);
exports.toDoListFuncController = new controller_1.ToDoListFuncController(toDoListFuncService);
const router_1 = require("./router");
app.use(router_1.toDoListRoutes);
app.listen(3000, function () {
    console.log("App started");
});
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
