import getTurkeyDateTime from '@/util/getTime';
import { hasher } from '@/util/hasher';

const useCreateMessages = () => {
    const createMessages = async (
        sender: string,
        receiver: string | null,
        message: string
    ) => {
        if (!sender || !receiver || !message) return;

        const hash = hasher(sender, receiver);
        const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD formatında gün al
        let messageCount;

        try {
            // 1. Firebase'den bugüne ait mesaj sayısını çek
            const counterResponse = await fetch(
                `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations/${hash}/messageCounter/${today}.json`
            );
            const counterData = await counterResponse.json();

            // Eğer bugün için sayaç yoksa başlat, varsa artır
            if (counterData === null) {
                messageCount = 1; // İlk mesaj
            } else {
                messageCount = counterData + 1; // Mevcut sayaç + 1
            }

            // 2. Firebase'e yeni mesajı gönder
            const response = await fetch(
                `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations/${hash}/messages/${today}_${messageCount}.json`,
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

            // 3. Sayaç bilgisini güncelle
            await fetch(
                `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations/${hash}/messageCounter/${today}.json`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageCount),
                }
            );
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return createMessages;
};

export default useCreateMessages;
