'use client'
import React, { useState, useEffect, useRef } from 'react';

const ConversationBody = () => {
    const initialMessages = [
        { id: 1, text: 'Merhaba!', sender: 'User1' },
        { id: 2, text: 'Selam!', sender: 'User2' },
        // Diğer mesajlar...
    ];

    const [messages, setMessages] = useState(initialMessages);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (text: any, sender: any) => {
        const newMessage = { id: messages.length + 1, text, sender };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="h-full w-full">
            <div className="bg-conversation-box w-full h-5/6 overflow-hidden">
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {messages.map((message) => (
                        <li key={message.id}>
                            <strong>{message.sender}:</strong> {message.text}
                        </li>
                    ))}
                </ul>
                <div ref={messagesEndRef} />
            </div>
            <button onClick={() => addMessage('Yeni mesaj', 'Kullanıcı')}>
                Yeni Mesaj Ekle
            </button>
        </div>
    );
};

export default ConversationBody;
