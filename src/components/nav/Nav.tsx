'use client';
import getCurrentUser from '@/app/actions/getCurrentUser';
import AvatarSection from './Avatar';

import Icons from './Icons';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
const Nav = () => {
    const session = useSession();

    useEffect(() => {
        if (session.data?.user) {
            const { email } = session.data.user;
            getCurrentUser(email!);
        }
    }, [session.data?.user?.email]);

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
