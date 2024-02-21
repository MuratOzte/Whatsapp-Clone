import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AvatarSection } from '..';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import uiSlice from '@/store/slices/uiSlice';
import DeleteConversationIcon from './DeleteConversation';

const ConversationHeader = () => {
    const ui = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch();

    const backButtonHandler = () => {
        dispatch(uiSlice.actions.closeMessage());
    };

    return (
        <div className="w-full h-10 flex justify-between items-center bg-search-nav">
            <div className="w-full h-full p-1 md:p-5 flex items-center">
                <div className="w-[24px] h-[24px] md:hidden flex mr-3">
                    <IoMdArrowRoundBack
                        color="gray"
                        onClick={backButtonHandler}
                    />
                </div>
                <AvatarSection name={ui.openedMessageName!} />
                <p className="text-gray-400 ml-5 md:ml-0">
                    {ui.openedMessageName}
                </p>
            </div>
            <DeleteConversationIcon />
        </div>
    );
};

export default ConversationHeader;
