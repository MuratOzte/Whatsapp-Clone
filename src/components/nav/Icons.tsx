'use client';
import React from 'react';
//icons
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { RiChatNewLine } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';
//packages
import { Tooltip } from '@mui/material';
import { signOut } from 'next-auth/react';

const EachIcon = React.forwardRef(
    (
        { Icon, title, event }: { Icon: any; title: string; event: string },
        ref
    ) => {
        const handleEvent = (data: string) => {
            console.log(data);
            if (data === 'logout') {
                signOut({ callbackUrl: '/' });
            }
        };

        return (
            <Tooltip title={title} arrow>
                <div ref={ref as React.RefObject<HTMLDivElement>}>
                    <Icon
                        color="gray"
                        size={'24px'}
                        onClick={handleEvent.bind(null, event)}
                    />
                </div>
            </Tooltip>
        );
    }
);

const Icons = () => {
    return (
        <div className="flex gap-4">
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
