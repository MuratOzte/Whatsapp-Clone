'use client';
//components
import { Nav, Search, Users, Conversation } from '@/components/index';
//hooks
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
//packages
import { motion, AnimatePresence } from 'framer-motion';
import OldMessageContainer from '@/components/messageHistory/OldMessageContainer';
import uiSlice from '@/store/slices/uiSlice';

export default function Messages() {
    const ui = useSelector((state: RootState) => state.ui);
    const dispatch = useDispatch();

    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dispatch(uiSlice.actions.closeMessage());
            }
        });
    }
    return (
        <div className="h-full w-full flex flex-row">
            <div className="bg-conversation h-full w-full md:w-2/6 border-r-slate-600 border-r-[0.5px] select-none">
                <AnimatePresence>
                    {ui.isAllUserModalOpen ? (
                        <motion.div
                            key="modal"
                            initial={{ x: -600 }}
                            animate={{ x: 0 }}
                            exit={{ x: -600 }}
                            transition={{ duration: 0.15, bounce: 0.1 }}
                            className="bg-conversation h-full w-full "
                        >
                            <Users />
                        </motion.div>
                    ) : (
                        <>
                            {ui.openedMessageName && windowWidth < 768 && (
                                <AnimatePresence>
                                    <motion.div
                                        className="h-full w-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <Conversation />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {!ui.openedMessageName && (
                                <>
                                    <Nav />
                                    <Search />
                                    <OldMessageContainer />
                                </>
                            )}
                            {ui.openedMessageName && windowWidth > 768 && (
                                <>
                                    <Nav />
                                    <Search />
                                    <OldMessageContainer />
                                </>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>

            <div className="bg-empty-state full hidden md:block w-4/6">
                {ui.openedMessageName && <Conversation />}
            </div>
        </div>
    );
}
