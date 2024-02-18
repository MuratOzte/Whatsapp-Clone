import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import useCreateMessage from '@/app/hooks/useCreateMessage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import uiSlice from '@/store/slices/uiSlice';

const ConversationFooter = () => {
    const [enteredMessage, setEnteredMessage] = useState('');
    const createMessage = useCreateMessage();
    const data = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        createMessage(
            data.currentUsername,
            data.openedMessageName,
            enteredMessage
        );
        dispatch(uiSlice.actions.setEnteredMessage(enteredMessage));
        setEnteredMessage('');
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [data.currentUsername, data.openedMessageName, enteredMessage]);

    return (
        <div className="w-full h-[80px] flex items-center justify-around bg-search-nav ">
            <IoMdAdd className="w-8 h-8 text-slate-400" />
            <div className="w-8/12 md:w-10/12 h-1/2 rounded-md bg-gray-700">
                <input
                    value={enteredMessage}
                    onChange={(e) => {
                        setEnteredMessage(e.currentTarget.value);
                    }}
                    className="bg-transparent w-full ml-0 rounded-md h-full border-none focus:outline-none p-3 text-sm text-gray-300"
                />
            </div>
            <IoSend onClick={handleSubmit} className="w-5 h-5 text-slate-400" />
        </div>
    );
};

export default ConversationFooter;
