interface OptimisticMessageProps {
    text: string;
    date: string;
}
const OptimisticMessage: React.FC<OptimisticMessageProps> = ({
    text,
    date,
}) => {
    return ( 
        <div className="flex justify-end">
            <div className="bg-phone-mymessage w-fit px-3 py-1 text-gray-400 rounded-lg my-2">
                {text}
            </div>
        </div>
    );
};

export default OptimisticMessage;
