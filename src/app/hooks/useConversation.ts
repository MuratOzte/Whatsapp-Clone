import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
    const params = useParams();

    const conversationId = useMemo(() => {
        return params.conversationId ? params.conversationId : '';
    }, [params.conseversationId]);

    const isOpen = useMemo(() => {
        return !!conversationId;
    }, [conversationId]);

    return useMemo(() => {
        return {
            conversationId,
            isOpen,
        };
    }, [conversationId, isOpen]);
};

export default useConversation;
