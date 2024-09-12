import { useEffect, useState } from 'react';
import axiosInstance from '../service/axiosInstance';

export default function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault(); // предотвращение перезагрузки страницы
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData); // data - объект с данными формы
    form.reset(); // очистка полей формы
    console.log({ dataFromForm });
    // Отправить данные на бекенд
    try {
      const response = await axiosInstance.post('/messages', dataFromForm);
      const newMessage = response.data; // Получили новые данные с бека
      setMessages((prev) => [newMessage, ...prev]); // Отобразили их
    } catch (error) {
      setError(error);
      const message = error?.response?.data?.text;
      alert(message || 'Возникла ошибка');
    }
  };

  useEffect(() => {
    axiosInstance('/messages')
      .then((res) => setMessages(res.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const deleteHandler = async (messageId) => {
    try {
      const response = await axiosInstance.delete(`/messages/${messageId}`);
      if (response.status === 200) {
        setMessages((prev) => prev.filter((message) => message.id !== messageId));
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return { messages, loading, submitHandler, deleteHandler, error };
}
