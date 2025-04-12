// src/components/TodoItem.jsx
import { List, Checkbox, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { updateTodo, deleteTodo } from '../services/api';
import './TodoItem.css';

function TodoItem({ todo, refreshTodos }) {
  const handleToggleComplete = async (e) => {
    try {
      await updateTodo(todo.id, { ...todo, completed: e.target.checked });
      refreshTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      refreshTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <List.Item
      className={todo.completed ? 'completed-todo' : ''}
      actions={[
        <Link to={`/todo/${todo.id}`}>
          <Button type="link" icon={<RightOutlined />}>Detay</Button>
        </Link>,
        <Popconfirm
          title="Bu görevi silmek istediğinize emin misiniz?"
          onConfirm={handleDelete}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button type="link" danger icon={<DeleteOutlined />}>Sil</Button>
        </Popconfirm>
      ]}
    >
      <List.Item.Meta
        avatar={
          <Checkbox 
            checked={todo.completed} 
            onChange={handleToggleComplete}
          />
        }
        title={
          <Link to={`/todo/${todo.id}`} className="todo-title">
            {todo.task}
          </Link>
        }
        description={todo.completed ? 'Tamamlandı' : 'Beklemede'}
      />
    </List.Item>
  );
}

export default TodoItem;