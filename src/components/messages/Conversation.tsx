import { ConversationBody, ConversationFooter, ConversationHeader } from '..';
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
