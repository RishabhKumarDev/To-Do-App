import { useState } from "react";
import useTodo from "../Coxtexts/TodoContext";

function TodoItem({ todo }) {
    // --the main use of this is to add and remove styles and make input field editable or readonly and to run 
    const[isTodoEditable, setIsTodoEditable] = useState(false);
    // this takes the new msz from input which is then used to pass the value in editTodo(); 
    const[todoMsg,setTodoMsg] = useState(todo.todo); // it have the initial value as the prop todo's todo to show the todo( text ).
     
    // all the methods from context file.
    const {toggleComplete , editTodo, deleteTodo} = useTodo();

    // this is provoked when "isTodoEditable" is true;
   const edit = ()=>{  //👇🏻 prop.
    editTodo(todo.id , {...todo, todo: todoMsg}); // it takes the id from the prop, and an {} in which it destructures the prop todo then access the prop todo's key "todo" and updates it with toMsz(i.e the edited mszed);
    setIsTodoEditable(false); // this removes all the styles caused by it.
   }
   
   // this is provked when clicked on the checkbox 
  const toggleCompleted = ()=>{
    toggleComplete(todo.id);// takes the prop todo's id.
  }
    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 w-full  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed} //it takes the prop todo's key's completed value ( which is either true or flase)
                onChange={toggleCompleted} // on Click on this the method get provoked.
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg} // it's initial value is prop's todo's
                onChange={(e) => setTodoMsg(e.target.value)} // it works when edit mode is on and on change changes the value of state - that will be used to update the obj's todo value
                readOnly={!isTodoEditable} // the logic is if "isTodoEditable" is false then readonly will receive true as it checks for oposite of what is, and when true it's ready only and when the readonly changes to true it get's false.
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return; // for edge case if the todo is marked completed then no one should be able to edit;
                       
                    // on first click "isTodoEditable" get's changed to true and on 2nd when it is true edit() is called and in edit() after calling the editTuto() it set the value of "isTodoEditable" to false.(that remvoes all the styles)
                    if (isTodoEditable) { 
                        edit();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed} // when the prop's todo's completed key is true.
            > 
                {isTodoEditable ? "📁" : "✏️"}  
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)} // onclick it calls this function and passes the props todo's id
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
