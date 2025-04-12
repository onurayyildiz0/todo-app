import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

function TodoDetail({ todo, refreshTodos, onBack }) {
  if (!todo) return null;

  return (
    <div>
      <Button type="link" onClick={onBack}>
        Geri
      </Button>
      <Title level={4}>{todo.task}</Title>
      <Text>{todo.details || 'Detay yok'}</Text>
    </div>
  );
}

export default TodoDetail;