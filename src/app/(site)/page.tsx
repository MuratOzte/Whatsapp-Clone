'use client';
import AuthForm from '@/components/auth/AuthForm';
import Background from '@/components/auth/Background';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../loading';

export default function Home() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        setLoading(false);

        if (session) {
            window.location.href = '/messages';
        }
    }, [session, status]);

    return (
        <div className="h-full w-full">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <AuthForm />
                    <Background />
                </>
            )}
        </div>
    );
}
