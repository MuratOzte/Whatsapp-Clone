import { Messages } from './MessageContainer';

interface OldTextContentProps {
    e: any;
    conversationLength: (data: string[]) => number;
}

const OldTextContent: React.FC<OldTextContentProps> = ({
    e,
    conversationLength,
}) => {
    return (
        <p className="w-11/12 overflow-hidden text-sm text-gray-500">
            {e.messages &&
                Object.values(e.messages) instanceof Array &&
                conversationLength(e.messages) !== undefined &&
                conversationLength(e.messages) !== null &&
                (Object.values(e.messages) as Messages[])[
                    conversationLength(e.messages)
                ]?.message}
        </p>
    );
};

export default OldTextContent;
