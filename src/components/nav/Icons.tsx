'use client';
import React, { useState } from 'react';
//icons
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { RiChatNewLine } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';
import { LuUsers } from 'react-icons/lu';
//packages
import { Tooltip } from '@mui/material';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';
//hooks
import { useDispatch } from 'react-redux';
//slices
import uiSlice from '@/store/slices/uiSlice';

const EachIcon = React.forwardRef(
    (
        { Icon, title, event }: { Icon: any; title: string; event: string },
        ref
    ) => {
        const dispatch = useDispatch();
        const [isClicked, setIsClicked] = useState(false);
        const handleEvent = (data: string) => {
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
            }, 1000);

            if (data === 'logout') {
                signOut({ callbackUrl: '/' });
            }
            if (data === 'users') {
                dispatch(uiSlice.actions.toggleAllUserModal());
            }
        };

        return (
            <Tooltip title={title} arrow>
                <div ref={ref as React.RefObject<HTMLDivElement>}>
                    <Icon
                        color="gray"
                        size={'24px'}
                        onClick={handleEvent.bind(null, event)}
                        className={clsx(
                            'cursor-pointer',
                            isClicked && 'animate-ping'
                        )}
                    />
                </div>
            </Tooltip>
        );
    }
);

const Icons = () => {
    return (
        <div className="flex gap-4">
            <EachIcon Icon={LuUsers} title="Users" event="users" />
            <EachIcon Icon={RiChatNewLine} title="New Chat" event="newchat" />
            <EachIcon
                Icon={SlOptionsVertical}
                title="Options"
                event="options"
            />
            <EachIcon Icon={RiLogoutBoxRLine} title="Logout" event="logout" />
        </div>
    );
};

export default Icons;
