import React, { useEffect, useState } from 'react'
import axiosInstance from '../service/axiosInstance';

export default function useOneMessage(messageId) {
    const [oneMessage, setOneMessage] = useState(null);

  useEffect(() => {
    axiosInstance(`/messages/${messageId}`).then((res) => setOneMessage(res.data));
  }, []);



  const createdDate = `${new Date(oneMessage?.createdAt).toLocaleDateString()} ${new Date(
    oneMessage?.createdAt,
  ).toLocaleTimeString()}`;
  const updatedDate = `${new Date(oneMessage?.updatedAt).toLocaleDateString()} ${new Date(
    oneMessage?.updatedAt,
  ).toLocaleTimeString()}`;

  const handleEdit = async (value) => {
    const res = await axiosInstance.patch(`/messages/${oneMessage.id}`, { text: value });
    setOneMessage(res.data);
  };

  return { oneMessage, createdDate, updatedDate, handleEdit };
}
