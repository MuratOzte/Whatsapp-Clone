'use client';
import AvatarSection from './Avatar';
import getCurrentUser from '@/app/actions/getCurrentUser';
import Icons from './Icons';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import useGetCurrentUser from '@/app/hooks/useGetCurrentUser';
const Nav = () => {
    const session = useSession();

    const response = useGetCurrentUser();
    console.log(response);

    return (
        <div className="w-auto bg-search-nav h-10 p-5 flex justify-between items-center">
            <AvatarSection />
            <div className="">
                <Icons />
            </div>
        </div>
    );
};

export default Nav;
