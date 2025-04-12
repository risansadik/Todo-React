import '../TodoInput.css';

interface ToDoInputProps {
    input : string;
    setInput : React.Dispatch<React.SetStateAction<string>>;
    onAdd : () => void;
}

const TodoInput:React.FC<ToDoInputProps> = ({input,setInput,onAdd}) => {

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onAdd();
      }
    };
  
    return (
      <div className="todo-input-container">
        <input
          type="text"
          className="todo-input"
          value={input}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
          placeholder="Enter a todo"
        />
        <button className="add-button" onClick={onAdd}>
          Add
        </button>
      </div>
    );
  };
    

export default TodoInput;
