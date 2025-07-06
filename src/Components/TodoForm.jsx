import { useState } from "react";
import useTodo from "../Coxtexts/TodoContext";

function TodoForm() {
    const {addTodo} = useTodo();
    const [todo,setTodo] = useState(""); // state to get the values of the text by user.

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!todo.trim()) return; 

        addTodo({todo,completed:false}); // passing an obj cuz the function is expecting an obj. and only writting todo cuz if you want to keep the "name" same as the value holder passed then shortcut. 
        setTodo("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                value={todo}
                onChange={(e)=> setTodo(e.target.value)} // updates the setTodo with the entered text and then it's used to update the obj.
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

