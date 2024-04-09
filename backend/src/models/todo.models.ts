import { Schema, model } from 'mongoose';



// Creating an interface
interface Todo {
    title: string,
    body: string,
    completed: boolean
}

const todoSchema = new Schema<Todo>({
    title: {
        type: String,
        required: [true, "Title should not be empty!"]
    },

    body: {
        type: String,
        required: [true, "Body should not be empty!"]
    },

    completed: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true});


export const Todo = model<Todo>('Todo', todoSchema);
