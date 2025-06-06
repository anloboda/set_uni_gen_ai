import React, { useState, useRef, useEffect } from 'react';
import '../css/TeacherChat.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Teacher {
  id: string;
  name: string;
  country: string;
  priceEur: number;
  profileUrl: string;
}

export const TeacherChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      const { explanation, teachers }: { explanation: string; teachers: Teacher[] } = data;

      const responseText =
        `<div class="explanation">${explanation}</div>` +
        `<div class="teacher-list">` +
        teachers
          .map(
            (t) => `
          <div class="teacher-card">
            <div><strong>${t.name}</strong> (${t.country})</div>
            <div>Ціна: €${t.priceEur}</div>
            <a href="${t.profileUrl}" target="_blank">Дивитись профіль</a>
          </div>`
          )
          .join('') +
        `</div>`;

      setMessages((prev) => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '<div class="error">Виникла помилка 😓</div>' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div
              className="bubble"
              dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br/>') }}
            />
          </div>
        ))}
        {loading && <div className="typing">AI набирає відповідь...</div>}
        <div ref={chatEndRef} />
      </div>

      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напиши свій запит..."
        />
        <button onClick={sendMessage} disabled={loading}>
          Відправити
        </button>
      </div>
    </div>
  );
};
