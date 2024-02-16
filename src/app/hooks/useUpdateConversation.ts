import { useCallback } from 'react';
import { RootState } from '@/store/store';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

const useUpdateConversation = () => {
    const data = useSelector((state: RootState) => state.ui);
    const session = useSession();

    const updateConversation = useCallback(
        async (messageText: string) => {
            try {
                const response = await fetch('/api/conversations', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: messageText,
                        sender: session?.data?.user?.name,
                        receiver: data.openedMessageName,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update conversation');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        [data.openedMessageName, session?.data?.user?.name]
    );

    return updateConversation;
};

export default useUpdateConversation;
