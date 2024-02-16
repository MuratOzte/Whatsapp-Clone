import { useCallback } from 'react';
import { RootState } from '@/store/store';
import { hasher } from '@/util/hasher';
import { useSelector } from 'react-redux';

const useCreateConversation = () => {
    const data = useSelector((state: RootState) => state.ui);

    // useCallback kullanarak createConversation fonksiyonunu sarmala
    const createConversation = useCallback(
        async (sender: string, receiver: string) => {
            if (!sender || !receiver) return;

            const hash = hasher(sender, receiver);

            try {
                const response = await fetch(
                    `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations/${hash}.json`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            members: [sender, receiver],
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error('Failed to create conversation');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        []
    );

    return createConversation;
};

export default useCreateConversation;
