'use client';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const UsersSearch = () => {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <>
            <div
                className="relative w-full px-4 pt-2"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            >
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-1 pl-8 rounded-lg bg-search-nav text-white relative"
                />
                <div
                    className="absolute left-5 top-[35px] flex items-center"
                    onClick={() => console.log('search')}
                >
                    <AnimatePresence>
                        {isFocus ? (
                            <motion.div
                                key="clearIcon"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.2 }}
                                style={{ position: 'absolute' }}
                            >
                                <ClearIcon sx={{ color: 'grey' }} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="searchIcon"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.2 }}
                                style={{ position: 'absolute' }}
                            >
                                <SearchIcon sx={{ color: 'grey' }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default UsersSearch;
