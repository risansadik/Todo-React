import '../TodoList.css'

interface Todo {
    text: string;
    completed: boolean
}

interface TodoListProps {
    todos: Todo[];
    onDelete: (index: number) => void;
    onEdit: (index: number) => void;
    onToggleComplete: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    onDelete,
    onEdit,
    onToggleComplete
}) => {
    return (
        <div className="todo-list-container">
          {todos.length > 0 ? (
            <ul className="todo-list">
              {todos.map((todo, index) => (
                <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleComplete(index)}
                  />
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                  </span>
                  <div className="todo-buttons">
                    <button 
                      className="edit-button" 
                      onClick={() => onEdit(index)}
                      disabled={todo.completed}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-list">
              <p>No tasks yet. Add your first todo!</p>
            </div>
          )}
        </div>
      );
    };
    
    export default TodoList;

