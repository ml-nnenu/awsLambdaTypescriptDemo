import { DynamoDB } from 'aws-sdk';

export class ToDoListFuncService {
    constructor(private docClient: DynamoDB.DocumentClient) { }

    getToDoListItem = async(pk: string, sk: string) => {
        const params = {
            TableName: 'toDoList-dev',
            Key: {
                "pk": pk,
                "sk": sk
            }
        };

        const toDolistItem = await this.docClient.get(params).promise();
        return toDolistItem
    }

    getAllToDoListItem = async() => {
        const params = {
            TableName: 'toDoList-dev'
        };

        const toDolistItems = await this.docClient.scan(params).promise();
        return toDolistItems
    };

}