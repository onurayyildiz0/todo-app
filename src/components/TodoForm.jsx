// src/components/TodoForm.jsx
import { useState } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { addTodo } from '../services/api';
import './TodoForm.css';

const { TextArea } = Input;

function TodoForm({ refreshTodos }) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const newTodo = [
        [
          values.task, 
          values.details || '', // Detaylar isteğe bağlı
        ]
      ];
  
      console.log('Gönderilen veri:', newTodo); 
      await addTodo(newTodo);
      form.resetFields();
      refreshTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="todo-form-container" title="Yeni Görev Ekle">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ completed: false }}
      >
        <Form.Item
          name="task"
          label="Görev"
          rules={[{ required: true, message: 'Lütfen görev adını girin!' }]}
        >
          <Input placeholder="Görevi girin..." />
        </Form.Item>
        
        <Form.Item
          name="details"
          label="Detaylar (İsteğe bağlı)"
        >
          <TextArea 
            placeholder="Görev detaylarını girin..." 
            rows={3} 
          />
        </Form.Item>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            icon={<PlusOutlined />}
            loading={isSubmitting}
          >
            Ekle
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default TodoForm;