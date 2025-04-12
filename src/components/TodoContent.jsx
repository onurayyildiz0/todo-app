import { Layout, Spin, Alert, Button, Tag, Typography } from 'antd';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const { Content } = Layout;
const { Title, Text } = Typography;

function TodoContent({
  todos,
  loading,
  error,
  currentView,
  selectedTodo,
  refreshTodos,
  handleViewChange,
  handleDelete,
  toggleCompletion,
}) {
  return (
    <Content className="content">
      {error && <Alert message={error} type="error" showIcon />}
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {currentView === 'list' && (
            <>
              <TodoForm refreshTodos={refreshTodos} />
              <TodoList
                todos={todos}
                refreshTodos={refreshTodos}
                onViewDetail={(todo) => handleViewChange('detail', todo)}
              />
            </>
          )}
          {currentView === 'detail' && selectedTodo && (
            <div>
              <Button type="link" onClick={() => handleViewChange('list')}>
                Geri
              </Button>
              <Title level={4}>{selectedTodo.task}</Title>
              <Text>{selectedTodo.details || 'Detay yok'}</Text>
              <div style={{ marginTop: '16px' }}>
                <Tag color={selectedTodo.completed === 'TRUE' ? 'green' : 'red'}>
                  {selectedTodo.completed === 'TRUE' ? 'Tamamlandı' : 'Tamamlanmadı'}
                </Tag>
                <Button
                  type="primary"
                  style={{ marginLeft: '8px' }}
                  onClick={toggleCompletion}
                >
                  {selectedTodo.completed === 'TRUE'
                    ? 'Tamamlanmadı Olarak İşaretle'
                    : 'Tamamlandı Olarak İşaretle'}
                </Button>
                <Button
                  type="primary"
                  danger
                  style={{ marginLeft: '8px' }}
                  onClick={handleDelete}
                >
                  Sil
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </Content>
  );
}

export default TodoContent;