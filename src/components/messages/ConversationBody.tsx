import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { hasher } from '@/util/hasher';
import { set } from 'react-hook-form';

const fetcher = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const ConversationBody = () => {
    const selectedData = useSelector((state: RootState) => state.ui);
    const [messages, setMessages] = useState<any>();
    const [optimisticMessage, setOptimisticMessage] = useState<string | null>(
        null
    );
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const hash = hasher(
        selectedData.currentUsername,
        selectedData.openedMessageName!
    );
    const url = `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations/${hash}/messages.json`;

    const { data, error } = useSWR(url, fetcher, {
        refreshInterval: 1,
        keepPreviousData: true,
    });

    if (error) {
        return <div>Error fetching data</div>;
    }

    const currentDate = new Date().toString();

    const newMessage = {
        message: 'Yeni Mesaj',
        receiver: 'Merhaba',
        sender: 'murat',
    };

    useEffect(() => {
        if (selectedData.enteredMessage) {
            setOptimisticMessage(selectedData.enteredMessage);
        }
    }, [selectedData.enteredMessage]);

    useEffect(() => {
        setMessages(data);

        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
        }
        setOptimisticMessage(null);
    }, [data, selectedData.enteredMessage, selectedData]);

    return (
        <div className="bg-conversation-box w-full h-[80%] overflow-hidden">
            <ul className="h-full overflow-auto p-2">
                <>
                    {messages &&
                        Object.keys(messages).map((key) => (
                            <li key={key}>
                                <strong>{messages[key].sender}:</strong>{' '}
                                {messages[key].message}
                            </li>
                        ))}
                    {optimisticMessage && (
                        <>
                            <strong>{selectedData.currentUsername}:</strong>{' '}
                            {optimisticMessage}
                        </>
                    )}
                    <div ref={messagesEndRef} />
                </>
            </ul>
        </div>
    );
};

export default ConversationBody;
