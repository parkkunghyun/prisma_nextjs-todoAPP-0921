'use client';

export default function Todo({ todo, onToggle, onDelete }) {
    return (
        <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center">
                <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} className="mr-2" />
                <span className={`${todo.completed ? 'line-through text-gray-500': '' }`}>{todo.text}</span>
            </div>
            <button onClick={() => onDelete(todo.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700" >Delete</button>
        </div>
    )
}