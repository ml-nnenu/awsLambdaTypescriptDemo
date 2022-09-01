import express from 'express';
import {toDoListFuncController} from "../app";

export const toDoListRoutes = express.Router();

toDoListRoutes.get('/toDoList/getItem', toDoListFuncController.getToDoListItemByKey);
toDoListRoutes.get('/toDoList/getAllItem', toDoListFuncController.getAllToDoListItem);
toDoListRoutes.post('/toDoList/addItem', toDoListFuncController.addToDoListItem);
toDoListRoutes.delete('/toDoList/deleteItem', toDoListFuncController.deleteToDoListItem);