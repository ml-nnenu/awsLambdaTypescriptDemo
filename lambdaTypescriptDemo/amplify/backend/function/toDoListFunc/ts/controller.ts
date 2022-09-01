import { Request, Response } from "express";
import { ToDoListFuncService } from './service';

export class ToDoListFuncController {
    constructor(private toDoListFuncService: ToDoListFuncService) { };

    errorHandling = (err: unknown, res: Response) => {
        console.log(err);
        res.status(500).json({ message: err })
    };

    getToDoListItemByKey = async (req: Request<{}, {}, {}, { pk: string, sk: string }>, res: Response) => {
        try {
            const toDoListItem = await this.toDoListFuncService.getToDoListItem(req.query.pk, req.query.sk);
            if (toDoListItem.Item) {
                const data = toDoListItem.Item;
                res.status(200).json({ data });
            }
        } catch (err) {
            this.errorHandling(err, res);
        }
    }

    getAllToDoListItem = async (req: Request, res: Response) => {
        try {
            const allToDoListItem = await this.toDoListFuncService.getAllToDoListItem();
            if (allToDoListItem.Items) {
                const data = allToDoListItem.Items;
                res.status(200).json({ data });
            } 
        } catch (err) {
            this.errorHandling(err, res);
        }
    }
}