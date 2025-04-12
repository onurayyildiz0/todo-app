import { List, Button, Tag } from 'antd';

function TodoList({ todos, onViewDetail }) {
  return (
    <List
      dataSource={todos}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button type="link" onClick={() => onViewDetail(item)}>
              Detay
            </Button>,
          ]}
        >
          <div>
            <Tag color={item.completed === 'TRUE' ? 'green' : 'red'}>
              {item.completed === 'TRUE' ? 'Tamamlandı' : 'Tamamlanmadı'}
            </Tag>
            {item.task}
          </div>
        </List.Item>
      )}
    />
  );
}

export default TodoList;