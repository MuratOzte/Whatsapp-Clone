import uiSlice from '@/store/slices/uiSlice';
import { RootState } from '@/store/store';
import { hasher } from '@/util/hasher';
import { MdOutlineDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

const DeleteConversationIcon = () => {
    const ui = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch();

    const deleteHandler = () => {
        if (ui.openedMessageName && ui.currentUsername) {
            const hash = hasher(ui.openedMessageName, ui.currentUsername);
            fetch(
                `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations/${hash}.json`,
                {
                    method: 'DELETE',
                }
            );
            dispatch(uiSlice.actions.closeMessage());
        }
    };

    return (
        <>
            <MdOutlineDelete
                onClick={deleteHandler}
                className="mr-[3%] hover:cursor-pointer"
                title="Delete Conversation"
                color="gray"
            />
        </>
    );
};

export default DeleteConversationIcon;
