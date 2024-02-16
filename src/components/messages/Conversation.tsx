import { useSelector } from 'react-redux';
import { ConversationBody, ConversationHeader, ConversationFooter } from '..';
import { RootState } from '@/store/store';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import useCreateConversation from '@/app/hooks/useCreateConversation';
const Conversation = () => {
    return (
        <div className="w-full h-full"> 
            <ConversationHeader />
            <ConversationBody />
            <ConversationFooter />
        </div>
    );
};

export default Conversation;
