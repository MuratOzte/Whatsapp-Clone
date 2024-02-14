'use client';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { Nav, Search } from '@/components/index';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Messages() {

    return (
        <div className="h-full w-full flex flex-row">
            <div className="bg-conversation  h-full w-full md:w-2/6 border-r-slate-600 border-r-[0.5px] select-none">
                <Nav />
                <Search />
            </div>
            <div className="bg-empty-state full w-0 md:w-4/6"></div>
        </div>
    );
}
