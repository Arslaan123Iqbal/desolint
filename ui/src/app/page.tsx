'use client';

import { useEffect, useState } from 'react';

interface Message {
  _id: string;
  message: string;
  createdAt: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create a new message
        await fetch('/api/hello');
        
        // Get all messages
        const response = await fetch('/api/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Messages from MongoDB</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message._id} className="p-4 border rounded-lg shadow">
              <p className="font-semibold">{message.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
