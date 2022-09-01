"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoListFuncService = void 0;
class ToDoListFuncService {
    constructor(docClient) {
        this.docClient = docClient;
        this.tableName = 'toDoList-dev';
        this.getToDoListItem = async (pk, sk) => {
            const params = {
                TableName: this.tableName,
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
                TableName: this.tableName
            };
            const toDolistItems = await this.docClient.scan(params).promise();
            return toDolistItems;
        };
        this.addToDoListItem = async (item) => {
            const params = {
                TableName: this.tableName,
                Item: Object.assign({}, item),
                ReturnConsumedCapacity: "INDEXES",
            };
            const addedToDoListItem = await this.docClient.put(params).promise();
            return addedToDoListItem;
        };
        this.deleteToDoListItem = async (key) => {
            const params = {
                TableName: this.tableName,
                Key: Object.assign({}, key),
                ReturnConsumedCapacity: "INDEXES",
            };
            const deletedItem = await this.docClient.delete(params).promise();
            return deletedItem;
        };
    }
}
exports.ToDoListFuncService = ToDoListFuncService;
