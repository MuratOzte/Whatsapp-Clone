'use client';
import { signOut, useSession } from 'next-auth/react';

function YourComponent() {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <div>
            {session ? (
                <>
                    <p>Welcome, {session?.user?.name}!</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </>
            ) : (
                <p>You are not signed in.</p>
            )}
        </div>
    );
}

export default YourComponent;
