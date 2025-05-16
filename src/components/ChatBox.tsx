import React, { useState } from 'react'

const functionUrl = 'https://thivirwz5fuihk5keazbbmsvce0mgeai.lambda-url.us-east-2.on.aws/';

type Message = {
  text: string;
  sender: 'ai'|'user';
}

function ChatBox() {
  const [message, setMessage] = useState<Message[]>([]);
  const [currentValue, updateValue] = useState<string>('');

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    updateValue("");
    const newMessages: Message[] = [...message, {
      text: currentValue,
      sender: 'user'
    }];
    setMessage(newMessages);
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      //headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
      redirect: "follow"
    });

    const reply = await response.text();

    setMessage([...newMessages, {
      text: reply,
      sender: 'ai'
    }]);
  }

  return <main>
    <h1> A Personal Dermatologist </h1>
    {message.map((message, index) => (
      <p key={index} className={`message ${message.sender}`}>{message.text}</p>
    ))}
    <form className="input-form" onSubmit={onSubmit}>
      <input type="text" placeholder="Message"
        value={currentValue}
        onChange={e => updateValue(e.target.value)}></input>
      <button type='submit'> Send </button>
    </form>
  </main>
}

export default ChatBox