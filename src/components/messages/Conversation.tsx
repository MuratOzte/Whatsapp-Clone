import { useSelector } from 'react-redux';
import { ConversationBody, ConversationHeader, ConversationFooter } from '..';
import { RootState } from '@/store/store';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import useCreateConversation from '@/app/hooks/useCreateConversation';
const Conversation = () => {
    const data = useSelector((state: RootState) => state.ui);
    const session = useSession();

    const createConversation = useCreateConversation();

    const updateConversation = useCallback(async () => {
        try {
          const response = await fetch('/api/conversations', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: 'Your message text', // Replace with your actual message text
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
      }, [data.openedMessageName, session?.data?.user?.name]);


    return (
        <div className="w-full h-full">
            <button className="w-1/2 h-full bg-gray-200" onClick={createConversation}>
                Selamke
            </button>
            <button className="w-1/2 h-full bg-gray-700" onClick={updateConversation}>
                devamke
            </button>
            <ConversationHeader />
            <ConversationBody />
            <ConversationFooter />
        </div>
    );
};

export default Conversation;
