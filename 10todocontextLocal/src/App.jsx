import React from 'react';
import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { TodoProvider } from './context/TodoContext'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    // setTodos(todo) it will not work
    // if you write setTodos(todo) then todo which contains many values will be deleted and current todo(passed in parameter of setTodo) will be set in todo, so we have to add new todo in current todo

    //search what is spread array concept in js
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
    //id: Date.now() only use for always get unique id
  }

  const updateTodo = (id, todo) => {

    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
    //prev.map means you apply loop on todos(prev)is an array which contains many todo(in form of object)
    //each todo(prevTodo  ) is object
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
    // .filter() creates a new array containing only the items for which the callback returns true.
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));//convert string to json

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  // Dependency array []:- An empty array [] means: run this effect only once — after the first render
  // It will not run on re-renders.


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))//convert json to string
  }, [todos])
  



  return (
    // <TodoProvider value= { todos, addTodo, updateTodo, deleteTodo, toggleComplete } > is not right because <TodoProvider value={here single value only allowed}> 
    // so make object of todos, addTodo, updateTodo, deleteTodo, toggleComplete 

    <TodoProvider value={ {todos, addTodo, updateTodo, deleteTodo, toggleComplete} } >
      {/* providing values(props) like todos, addTodo, updateTodo, deleteTodo, toggleComplete to below root div */}

      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}

                        {todos.map((todo) => (
                          <div key={todo.id}//key says that every div should be unique
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}

                        {/* above loop is written in {...} because we write js in html tag */}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App