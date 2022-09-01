"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDoListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const app_1 = require("../app");
exports.toDoListRoutes = express_1.default.Router();
exports.toDoListRoutes.get('/toDoList/getItem', app_1.toDoListFuncController.getToDoListItemByKey);
exports.toDoListRoutes.get('/toDoList/getAllItem', app_1.toDoListFuncController.getAllToDoListItem);
exports.toDoListRoutes.post('/toDoList/addItem', app_1.toDoListFuncController.addToDoListItem);
exports.toDoListRoutes.delete('/toDoList/deleteItem', app_1.toDoListFuncController.deleteToDoListItem);
