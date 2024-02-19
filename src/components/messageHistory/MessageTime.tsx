interface OldMessageTimeProps {
    e: any;
    conversationLength: (data: string[]) => number;
}

const OldMessageTime: React.FC<OldMessageTimeProps> = ({
    e,
    conversationLength,
}) => {
    return (
        <p className="w-4/12 overflow-hidden text-[16px] text-gray-500 text-right">
            {e.messages &&
                Object.keys(e.messages).length > 0 &&
                Object.keys(e.messages)
                    [conversationLength(e.messages)].split(' at ')[1]
                    .split(':')
                    .slice(0, 2)
                    .join(':')}
        </p>
    );
};

export default OldMessageTime;
