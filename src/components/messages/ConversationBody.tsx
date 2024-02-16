import * as React from 'react';
import { useSession } from 'next-auth/react';
import useSwr from 'swr';
import { Messages } from '@/models/Conversations';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ConversationBody = () => {
    const session = useSession();
    const receiver = useSelector(
        (state: RootState) => state.ui.openedMessageName
    );

    const { data, isLoading, error, isValidating, mutate } = useSwr(
        'Messages',
        async () => {
            const response = await fetch('/api/get-conversation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // JSON formatında veri gönderiyorsanız
                },
                body: JSON.stringify({
                    sender: session.data?.user?.name,
                    receiver: receiver,
                }),
            });
            const responseData: Messages = await response.json();
            return responseData;
        }
    );

    console.log(data);
    return (
        <div className="bg-conversation-box w-full h-[80%] overflow-auto"></div>
    );
};

export default ConversationBody;
