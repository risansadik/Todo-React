
import { useEffect, useState } from 'react';
import '../TodoList.css'
import { formatRelativeTime } from '../utils/timeUtils';

interface Todo {
    text: string;
    completed: boolean;
    timestamp: number;
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

    const [relativeTimes, setRelativeTimes] = useState<string[]>([]);

    useEffect(() => {

        const updateRelativeTimes = () => {
            const newRelativeTimes = todos.map(todo =>
                formatRelativeTime(todo.timestamp)
            );
            setRelativeTimes(newRelativeTimes);
        };

        updateRelativeTimes();

        const intervalId = setInterval(updateRelativeTimes, 60000);

        return () => clearInterval(intervalId);
    }, [todos])
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
                            <div className="todo-content">
                                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                                    {todo.text}
                                </span>
                                <span className="todo-timestamp">
                                    {relativeTimes[index] || formatRelativeTime(todo.timestamp)}
                                </span>
                            </div>
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

