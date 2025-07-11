import TodoForm from "./Components/ToDoForm";
import TodoItem from "./Components/TodoItem";
import useTodo from "./Coxtexts/TodoContext";

function App() {
  const { todos } = useTodo();

  return (
    <>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos?.map((todo) => ( // get all the todos and map and put them in a div and pass the todo as the prop cuz they only work on these values
              <div className=" w-full">
                <TodoItem key={todo.id} todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
