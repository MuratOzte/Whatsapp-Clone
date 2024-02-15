'use client';
import { IoArrowBack } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import uiSlice from '@/store/slices/uiSlice';

const UsersHeader = () => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="w-full h-[10%] bg-search-nav items-center flex justify-start">
                <IoArrowBack
                    color="gray"
                    className="mx-3 cursor-pointer hover:transform scale-125 transition-all duration-200"
                    onClick={() =>
                        dispatch(uiSlice.actions.toggleAllUserModal())
                    }
                />
                <h1 className="text-2xl text-gray-400 font-sans">New Chat</h1>
            </div>
        </>
    );
};

export default UsersHeader;
