import React, { useState } from 'react';
import axios from 'axios';
import "./chatgpt.css"

const ChatGpt = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    // Make API request to ChatGPT
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'text-davinci-003',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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',
          },
        }
      );

      // Update state with the response
      setMessages([...messages, { role: 'assistant', content: response.data.choices[0].message.content }]);
      setInput('');
      console.log(messages);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatGpt;