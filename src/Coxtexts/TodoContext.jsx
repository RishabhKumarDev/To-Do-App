import { createContext, useContext, useEffect, useState } from "react";

export const TodoContext = createContext({ // these default values are for saftey;
  todos: [
    {
      id: 1,
      todo: "Do this work",
      completed: false,
    },
    {
      id: 1,
      todo: "Do this work 2",
      completed: true,
    },
  ],
  addTodo: () => {},
  editTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);


  // to add todos
  const addTodo = (todo) => { // we are receiving an obj that's why we are spreading it in the 
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
    console.log("addtodo is working", todo);
    
  };

  // to edit todos
  const editTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
    console.log("edit todo is working")
  };
 
  // to delete todos
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
    console.log("delete todo is working")
  };
 
  // to toggle the style for adding styling of completions
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
    console.log("toggle todo is working")
  };

  // this will run on the time of initial render, to get all the todos saved on the local storage.
  useEffect(() => {
    const todos = localStorage.getItem("todos");

    

    if (todos){
      const parseTodos = JSON.parse(todos);
      if(parseTodos && parseTodos.length >0){
        setTodos(parseTodos);
      }
    }
      
  }, []);


  //  this update the local storage with the changes done in the todos state.
  useEffect(() => {
   if (todos && Array.isArray(todos)) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleComplete, editTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default function useTodo() {
  return useContext(TodoContext);
}
