'use client';
//components
import { Nav, Search, Users } from '@/components/index';
//hooks
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
//packages
import { motion } from 'framer-motion';

export default function Messages() {
    const ui = useSelector((state: RootState) => state.ui);
    return (
        <div className="h-full w-full flex flex-row">
            <div className="bg-conversation  h-full w-full md:w-2/6 border-r-slate-600 border-r-[0.5px] select-none">
                {!ui.isAllUserModalOpen ? (
                    <>
                        <Nav />
                        <Search />
                    </>
                ) : (
                    <motion.div
                        initial={{ x: -600 }}
                        animate={{ x: 0 }}
                        exit={{ x: -600 }}
                        transition={{ duration: 0.2, bounce: 0.1 }}
                        className="bg-red-400 h-full w-full"
                    >
                        <Users />
                    </motion.div>
                )}
            </div>
            <div className="bg-empty-state full w-0 md:w-4/6"></div>
        </div>
    );
}
