import useSWR from 'swr';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { hasher } from '@/util/hasher';
import { useState, useRef, useEffect } from 'react';

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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const hash = hasher(
        selectedData.currentUsername,
        selectedData.openedMessageName!
    );
    const url = `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations/${hash}/messages.json`;

    const { data, error } = useSWR(url, fetcher, {
        refreshInterval: 80,
        keepPreviousData: true,
    });

    if (error) {
        return <div>Error fetching data</div>;
    }

    useEffect(() => {
        setMessages(data);
        console.log(data);
    }, [data]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="bg-conversation-box w-[100%] h-[80%] overflow-hidden">
            <ul className="h-full overflow-auto">
                <>
                    {messages &&
                        Object.keys(messages).map((key) => (
                            <li key={key}>
                                <strong>{messages[key].sender}:</strong>{' '}
                                {messages[key].message}
                            </li>
                        ))}
                    {selectedData.enteredMessage == ''
                        ? ''
                        : selectedData.enteredMessage}
                    <div ref={messagesEndRef} />
                </>
            </ul>
        </div>
    );
};

export default ConversationBody;
