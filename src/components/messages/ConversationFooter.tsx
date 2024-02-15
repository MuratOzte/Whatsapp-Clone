import { useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';

const ConversationFooter = () => {
    return (
        <div className="w-full h-[80px] flex items-center justify-around bg-search-nav">
            <IoMdAdd className="w-8 h-8 text-slate-400" />
            <div className="w-10/12 h-1/2 rounded-md bg-gray-700">
                <span className="ml-3">$</span>
                <input className="bg-transparent w-fulls rounded-md h-full border-none focus:outline-none p-3 text-sm text-gray-300" />
            </div>
            <IoSend className="w-5 h-5 text-slate-400" />
        </div>
    );
};

export default ConversationFooter;
