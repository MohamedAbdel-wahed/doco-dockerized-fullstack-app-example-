"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_db_1 = __importDefault(require("./config/connect-db"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const todo_models_1 = require("./models/todo.models");
const PORT = process.env.PORT || 4004;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
//routes
app.get('/', async (req, res) => {
    // const title="first todo title";
    // const body="first todo body";
    // const newTodo = await Todo.create({title, body});
    // res.status(200).json({ todo: newTodo, message: "Todo has been created!" });
    const todos = await todo_models_1.Todo.find({}).sort('-createdAt');
    if (todos?.length === 0) {
        throw new Error("Todo list is empty!");
    }
    res.status(200).json({ todos, msg: "All Todos have been fetched!" });
});
app.use('/api/todos', todo_routes_1.default);
const startDB = async () => {
    try {
        await (0, connect_db_1.default)(process.env.MONGO_URI);
        console.log('Mongodb is connected!!!');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
// connecting to Mongodb and starting the server
startDB();
