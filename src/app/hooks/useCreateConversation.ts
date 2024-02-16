import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSession } from 'next-auth/react';

const useCreateConversation = () => {
    const data = useSelector((state: RootState) => state.ui);
    const session = useSession();
    const createConversation = useCallback(async () => {
        try {
            const response = await fetch('/api/conversations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiver: data.openedMessageName,
                    sender: session?.data?.user?.name,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create conversation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, [data.openedMessageName, session?.data?.user?.name]);

    return createConversation;
};

export default useCreateConversation;
