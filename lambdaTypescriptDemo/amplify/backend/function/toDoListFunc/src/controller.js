"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoListFuncController = void 0;
class ToDoListFuncController {
    constructor(toDoListFuncService) {
        this.toDoListFuncService = toDoListFuncService;
        this.errorHandling = (err, res) => {
            console.log(err);
            res.status(500).json({ message: err });
        };
        this.getToDoListItemByKey = async (req, res) => {
            try {
                const toDoListItem = await this.toDoListFuncService.getToDoListItem(req.query.pk, req.query.sk);
                if (toDoListItem.Item) {
                    const data = toDoListItem.Item;
                    res.status(200).json({ data });
                }
            }
            catch (err) {
                this.errorHandling(err, res);
            }
        };
        this.getAllToDoListItem = async (req, res) => {
            try {
                const allToDoListItem = await this.toDoListFuncService.getAllToDoListItem();
                if (allToDoListItem.Items) {
                    const data = allToDoListItem.Items;
                    res.status(200).json({ data });
                }
            }
            catch (err) {
                this.errorHandling(err, res);
            }
        };
    }
    ;
}
exports.ToDoListFuncController = ToDoListFuncController;
