interface MessageProps {
    isRecieved: boolean;
    senderName: string;
    date: string;
    text: string;
}

const Message: React.FC<MessageProps> = ({
    isRecieved,
    senderName,
    date,
    text,
}) => {
    console.log(isRecieved, senderName, date, text);

    return (
        <div
            className={`w-full h-full flex ${
                isRecieved ? 'justify-start' : 'justify-end'
            }`}
        >
            {isRecieved && (
                <div className="bg-search-nav w-fit px-3 py-1 text-gray-400 rounded-lg my-2">
                    {text}
                </div>
            )}
            {!isRecieved && (
                <div className="bg-phone-mymessage w-fit px-3 py-1 text-gray-300 rounded-lg my-1">
                    {text}
                </div>
            )}
        </div>
    );
};

export default Message;
