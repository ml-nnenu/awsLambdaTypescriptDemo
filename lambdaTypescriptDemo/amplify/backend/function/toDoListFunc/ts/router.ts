import express from 'express';
import {toDoListFuncController} from "./app";

export const toDoListRoutes = express.Router();

toDoListRoutes.get('/toDoList/item', toDoListFuncController.getToDoListItemByKey);
toDoListRoutes.get('/toDoList/all', toDoListFuncController.getAllToDoListItem);