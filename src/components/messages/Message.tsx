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
    // const time = date.split(' at ')[1].split(':').slice(0, 2).join('.');

    return (
        <div
            className={`w-full h-full flex ${
                isRecieved ? 'justify-start' : 'justify-end'
            }`}
        >
            {isRecieved && (
                <div className="bg-search-nav w-fit px-3 py-1 text-gray-400 rounded-lg my-2 flex flex-col items-start">
                    <p className="text-sm break-words max-w-48 md:max-w-72">
                        {text}
                    </p>
                    <div className="flex">
                        <p className="text-[8px] mt-1">{'deneme'}</p>
                    </div>
                </div>
            )}
            {!isRecieved && (
                <div className="bg-phone-mymessage w-fit px-3 py-1 text-gray-300 rounded-lg my-1 flex flex-col items-end ">
                    <p className="text-sm break-words max-w-48 md:max-w-72">
                        {text}
                    </p>
                    <div className="flex">
                        <p className="text-[8px] mt-1">{'deneme'}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Message;
