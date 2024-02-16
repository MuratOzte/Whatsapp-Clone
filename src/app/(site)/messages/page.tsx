'use client';
//components
import { Nav, Search, Users, Conversation } from '@/components/index';
//hooks
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
//packages
import { motion, AnimatePresence } from 'framer-motion';
import PhoneConversation from '@/components/phone/PhoneConversation';

export default function Messages() {
    const ui = useSelector((state: RootState) => state.ui);

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
                            className="bg-conversation h-full w-full"
                        >
                            <Users />
                        </motion.div>
                    ) : (
                        <>
                            {!ui.openedMessageId && (
                                <>
                                    <Nav />
                                    <Search />
                                </>
                            )}
                            {ui.openedMessageId && <Conversation />}
                        </>
                    )}
                </AnimatePresence>
            </div>

            <div className="bg-empty-state full w-0 md:w-4/6">
                {ui.openedMessageId && <Conversation />}
            </div>
        </div>
    );
}
