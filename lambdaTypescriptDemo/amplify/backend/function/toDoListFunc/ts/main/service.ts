import { DynamoDB } from 'aws-sdk';

export class ToDoListFuncService {
    constructor(private docClient: DynamoDB.DocumentClient) { }
    private tableName = 'toDoList-dev';

    getToDoListItem = async (pk: string, sk: string) => {
        const params = {
            TableName: this.tableName,
            Key: {
                "pk": pk,
                "sk": sk
            }
        };

        const toDolistItem = await this.docClient.get(params).promise();
        return toDolistItem
    }

    getAllToDoListItem = async () => {
        const params = {
            TableName: this.tableName
        };

        const toDolistItems = await this.docClient.scan(params).promise();
        return toDolistItems
    };

    addToDoListItem = async (item: {
        "pk": string;
        "sk": string;
        "isFinished": boolean;
        "activity": string;
        "createdAt": string;
        "updatedAt": string;
    }) => {
        const params = {
            TableName: this.tableName,
            Item: {
                ...item
            },
            ReturnConsumedCapacity: "INDEXES",
        };
        const addedToDoListItem = await this.docClient.put(params).promise();
        return addedToDoListItem
    };

    deleteToDoListItem =async (key: {
        "pk":string;
        "sk": string;
    }) => {
        const params = {
            TableName: this.tableName,
            Key: {
                ...key
            },
            ReturnConsumedCapacity: "INDEXES",
        };
        const deletedItem = await this.docClient.delete(params).promise();
        return deletedItem
    }
}