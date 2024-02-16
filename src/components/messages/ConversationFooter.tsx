import { useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import useCreateMessage from '@/app/hooks/useCreateMessage';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ConversationFooter = () => {
    const createMessage = useCreateMessage();
    const data = useSelector((state: RootState) => state.ui);
    return (
        <div className="w-full h-[80px] flex items-center justify-around bg-search-nav">
            <IoMdAdd className="w-8 h-8 text-slate-400" />
            <div className="w-10/12 h-1/2 rounded-md bg-gray-700">
                <span className="ml-3">$</span>
                <input className="bg-transparent w-fulls rounded-md h-full border-none focus:outline-none p-3 text-sm text-gray-300" />
            </div>
            <IoSend
                onClick={() => {
                    createMessage(
                        data.currentUsername,
                        data.openedMessageName,
                        'Merhaba',
                        '12.02.2024/12:00:00'
                    );
                }}
                className="w-5 h-5 text-slate-400"
            />
        </div>
    );
};

export default ConversationFooter;
