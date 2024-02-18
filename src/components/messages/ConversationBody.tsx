import { RootState } from '@/store/store';
import { hasher } from '@/util/hasher';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import Message from './Message';
import OptimisticMessage from './OptimisticMessage';

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
        onSuccess: () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({
                    behavior: 'instant',
                });
            }
        },
    });

    if (error) {
        return <div>Error fetching data</div>;
    }

    const currentDate = new Date().toString();

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
        if (selectedData.enteredMessage) {
            setOptimisticMessage((prev) => selectedData.enteredMessage);
        }
    }, [selectedData.enteredMessage]);

    useEffect(() => {
        setMessages(data);

        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
        return () => {
            setOptimisticMessage(null);
        };
    }, [data, selectedData.enteredMessage, selectedData]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [optimisticMessage]);

    return (
        <div className="bg-conversation-box w-full h-[80%] overflow-hidden">
            <ul className="h-full overflow-auto p-2">
                <>
                    {messages &&
                        Object.keys(messages).map((key) => (
                            <li key={key}>
                                <Message
                                    isRecieved={
                                        messages[key].sender ===
                                        selectedData.openedMessageName
                                    }
                                    senderName={messages[key].sender}
                                    date={key}
                                    text={messages[key].message}
                                />
                            </li>
                        ))}
                    {optimisticMessage && (
                        <OptimisticMessage
                            text={optimisticMessage}
                            date={currentDate}
                        />
                    )}
                </>
                <div ref={messagesEndRef} />
            </ul>
        </div>
    );
};

export default ConversationBody;
