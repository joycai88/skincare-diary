import React, { useRef, useState } from 'react'
import { Paperclip, Send } from 'lucide-react';

const functionUrl = 'https://thivirwz5fuihk5keazbbmsvce0mgeai.lambda-url.us-east-2.on.aws/';

type Message = {
  text: string;
  sender: 'ai'|'user';
}

function ChatBox() {
  const [message, setMessage] = useState<Message[]>([]);
  const [currentValue, updateValue] = useState<string>('');
  const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }

  // useEffect(() => {
  //   scrollToBottom();
  // }, [message]);

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  }

  return (
    <div>
      {/*Chat messages*/}
      <div className="flex-1 overflow-y-auto mb-6 space-y-6">
        {message.map((message, index) => (
          <div
              key={index}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
            {/*Avatar*/}
            <div className={`w-10 h-10 rounded-full flex-shrink-0 ${
              message.sender === 'user' ? 'bg-[#D4A5A5]' : 'bg-[#7FA99B]'
            }`}>
              {message.sender === 'ai' && (
                <div className="w-full h-full flex items-center justify-center text-white text-xs">
                  AI
                </div>
              )}
            </div>

            {/*Chat Bubble*/}
            <div
              className={`max-w-2xl ox-6 py-4 rounded-2xl ${
                message.sender === "user"
                   ? 'bg-white border-2 border-[#7FA99B] rounded-tr-none'
                   : 'bg-white border-2 border-[#7FA99B] rounded-tl-none'
              }`}>
              <p className='text-[#694F5D] text-sm leading-relaxed'>
                {message.text}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/*Input Area*/}
      <div className='border-2 border-[#694F5D] rounded-3xl bg-white px-6 py-4 flex items-center gap-4'>
        <input
          type='text'
          placeholder='Type a message here'
          value={currentValue}
          onChange={e => updateValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className='flex-1 bg-transparent outline-none text-[#694F5D] placeholder-[#694F5D]'
        />
        <div className='flex items-center-gap-3'>
          <button className='text-[#694F5D] hover:text-[#7FA99B] transition-colors'>
            <Paperclip className='w-6 h-6' />
          </button>
          <button
            onClick={onSubmit}
            className='text-[#694F5D] hover:text-[#7FA99B] transition-colors'
          >
            <Send className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox