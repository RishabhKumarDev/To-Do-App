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
     // the reason we are destructuring cuz React only updates the values when the referenc has changed and not just the value(search if didn't get it)
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]); // take the prev value of the todos which will hold an array and destructure it
    //                                                              then add a obj and put the id key and value and then destructure the recived todo.
    
  };

  // to edit todos
  const editTodo = (id, todo) => { // recieve an id and an obj( so no need to destructure here it's alwready )
    setTodos((prev) => 
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)) // if the id matches it updates the passed values i.e an obj with updated values
    );
  };
 
  // to delete todos
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id)); // simply checks if the id passed is not equal to the todo id, so it only returns all the todo's whose id's are different
  };
 
  // to toggle the style for adding styling of completions
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) => // map over the arr of obj(todo)
        prevTodo.id === id // match the id
          ? { ...prevTodo, completed: !prevTodo.completed } // if true destructure it and update the value of key "completed" to opsite of it.
          : prevTodo // if false the then return prevTodo (don't change the values)
      )
    );
  };

  // this will run on the time of initial render, to get all the todos saved on the local storage.
  useEffect(() => {
    const todos = localStorage.getItem("todos"); // get the todos 

    if (todos){ // check if todo exists
      const parseTodos = JSON.parse(todos); // convert them from string to useable format
      if(parseTodos && parseTodos.length >0){ // fi true
        setTodos(parseTodos); // set them
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
