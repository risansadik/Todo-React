import { useState , useEffect } from "react";
import TodoInput from './components/ToDoInput';
import TodoList from './components/TodoList';
import './App.css';

interface Todo {
  text : string;
  completed : boolean;
  timestamp : number;
}

const App:React.FC = () => {

  const [input , setInput] = useState<string>("");
  const [todos , setTodos] = useState<Todo[]>([]);
  const [editIndex , setEditIndex] = useState<number | null>(null);
  const [isInitialized , setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setIsInitialized(true);
  }, []);
  
  useEffect(() => {
    if(isInitialized){
    localStorage.setItem("todos", JSON.stringify(todos));
  }}, [todos,isInitialized]);
  
  const addTodo = () => {

    if(!input.trim()) return;

    if(editIndex !== null) {

      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = input;
      updatedTodos[editIndex].timestamp = Date.now();
      setTodos(updatedTodos);
      setEditIndex(null);

    }else{

      setTodos((prev) => [...prev,{text:input,completed:false,timestamp:Date.now()}]);
    }

    setInput("");
  };

  const deleteTodo = (index : number) => {
    setTodos((prev) => prev.filter((_,i) => i !== index));
  }

  const editTodo = (index : number) => {
    setInput(todos[index].text);
    setEditIndex(index);
  }

  const toggleComplete = (index : number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;

    const sortedTodos = updatedTodos.sort((a,b) => {
      if(a.completed === b.completed) return 0;
      return a.completed ? 1 : -1
    });

    setTodos(sortedTodos)
  }


  return (
    <div className="container">
      <h1>{editIndex !== null ? "Edit Todo" : "My Todo List"}</h1>
      <TodoInput input={input} setInput={setInput} onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} onToggleComplete={toggleComplete}/>
      
      {todos.length > 0 && (
        <div className="task-counter">
          {todos.length} {todos.length === 1 ? 'task ' : 'tasks '}
          {todos.filter(todo => todo.completed).length} completed
        </div>
      )}
    </div>
  );
};

export default App;

