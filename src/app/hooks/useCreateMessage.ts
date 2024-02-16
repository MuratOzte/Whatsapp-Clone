import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { hasher } from '@/util/hasher';
import getTurkeyDateTime from '@/util/getTime';
const useCreateMessages = () => {
    const data = useSelector((state: RootState) => state.ui);

    const createMessages = async (
        sender: string,
        receiver: string | null,
        message: string,
    ) => {
        if (!sender || !receiver || !message) return;

        const hash = hasher(sender, receiver);
        const time = getTurkeyDateTime()

        try {
            const response = await fetch(
                `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations/${hash}/messages/${time}.json`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sender: sender,
                        receiver: receiver,
                        message: message,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to create message');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return createMessages;
};

export default useCreateMessages;
