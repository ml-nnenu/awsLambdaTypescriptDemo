"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoListFuncService = void 0;
class ToDoListFuncService {
    constructor(docClient) {
        this.docClient = docClient;
        this.getToDoListItem = async (pk, sk) => {
            const params = {
                TableName: 'toDoList-dev',
                Key: {
                    "pk": pk,
                    "sk": sk
                }
            };
            const toDolistItem = await this.docClient.get(params).promise();
            return toDolistItem;
        };
        this.getAllToDoListItem = async () => {
            const params = {
                TableName: 'toDoList-dev'
            };
            const toDolistItems = await this.docClient.scan(params).promise();
            return toDolistItems;
        };
    }
}
exports.ToDoListFuncService = ToDoListFuncService;
