import { useState, useEffect } from 'react';
import { Layout, Typography, Spin, Alert } from 'antd';
import TodoContent from './components/TodoContent';
import { fetchTodos, deleteTodo, updateTodo } from './services/api';
import './App.css';

const { Header } = Layout;
const { Title } = Typography;

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('list'); 
  const [selectedTodo, setSelectedTodo] = useState(null); 

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data.data);
        setLoading(false);
      } catch (err) {
        setError('Görevler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  const refreshTodos = async () => {
    setLoading(true);
    try {
      const data = await fetchTodos();
      setTodos(data.data);
    } catch (err) {
      setError('Görevler yüklenirken bir hata oluştu.');
    }
    setLoading(false);
  };

  const handleViewChange = (view, todo = null) => {
    setCurrentView(view);
    setSelectedTodo(todo);
  };

  const handleDelete = async () => {
    if (!selectedTodo) return;
    try {
      await deleteTodo(selectedTodo.row_id); // `row_id` ile görevi sil
      refreshTodos(); // Görev listesini yenile
      setCurrentView('list'); // Liste görünümüne geri dön
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleCompletion = async () => {
    if (!selectedTodo) return;
    try {
      const updatedTodo = {
        ...selectedTodo,
        completed: selectedTodo.completed === 'TRUE' ? 'FALSE' : 'TRUE',
      };
      await updateTodo(selectedTodo.row_id, updatedTodo);
      refreshTodos();
      setSelectedTodo(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={3} style={{ color: 'white', margin: 0 }}>Todo Uygulaması</Title>
      </Header>
      <TodoContent
        todos={todos}
        loading={loading}
        error={error}
        currentView={currentView}
        selectedTodo={selectedTodo}
        refreshTodos={refreshTodos}
        handleViewChange={handleViewChange}
        handleDelete={handleDelete}
        toggleCompletion={toggleCompletion}
      />
    </Layout>
  );
}

export default App;