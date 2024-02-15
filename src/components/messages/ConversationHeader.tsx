import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AvatarSection } from '..';

const ConversationHeader = () => {
    const ui = useSelector((state: RootState) => state.ui);

    return (
        <div className="w-full h-10 p-5 bg-search-nav flex items-center">
            <AvatarSection />
            <p className="text-gray-400">{ui.openedMessageName}</p>
        </div>
    );
};

export default ConversationHeader;
