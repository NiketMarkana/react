import {createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [{id: 1, text: "Hello world"}]
}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), //generates unique ID for each todo
                text: action.payload // the todo text comes from the action
                //action :- In Redux, when you want to change the state, you dispatch an action.An action is just an object with a type and (sometimes) extra data.
                //payload :- When you use Redux Toolkit’s createSlice, it automatically creates action creators for you.
            }
            state.todos.push(todo)//todos is from initialState line no. 4
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )
        },
    }//reducers
})

export const {addTodo, removeTodo} = todoSlice.actions

export default todoSlice.reducer//search :- what is difference between export and export default?
//it is import by "import todoReducer from '../features/todo/todoSlice';" in store.js