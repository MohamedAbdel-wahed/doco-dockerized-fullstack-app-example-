import "express-async-errors";
import express, { Request, Response } from 'express'
import cors from 'cors'

import connectDB from "./config/connect-db";
import todoRouter from './routes/todo.routes'
import { Todo } from "./models/todo.models";

const PORT = process.env.PORT || 4004;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())







//routes
app.get('/', async (req: Request, res: Response) => {
    // const title="first todo title";
    // const body="first todo body"; 

    // const newTodo = await Todo.create({title, body});
    // res.status(200).json({ todo: newTodo, message: "Todo has been created!" });

    const todos = await Todo.find({}).sort('-createdAt');

    if (todos?.length === 0) {
      throw new Error("Todo list is empty!");
    }

    res.status(200).json({ todos, msg: "All Todos have been fetched!" });
});

app.use('/api/todos', todoRouter);



const startDB = async () => {
    try {
        await connectDB(process.env.MONGO_URI as string);
        console.log('Mongodb is connected!!!')
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
// connecting to Mongodb and starting the server
startDB();
