'use client';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { RiChatNewLine } from 'react-icons/ri';
import { SlOptionsVertical } from 'react-icons/sl';
import { Tooltip } from '@mui/material';

const EachIcon = ({
    Icon,
    title,
    event,
}: {
    Icon: any;
    title: string;
    event: string;
}) => {
    const handleEvent = (data: string) => {
        console.log(data);
    };

    return (
        <Tooltip title={title} arrow>
            <Icon
                color="gray"
                size={'24px'}
                onClick={handleEvent.bind(null, event)}
            />
        </Tooltip>
    );
};

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
