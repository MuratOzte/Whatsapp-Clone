import { useSession } from 'next-auth/react';
import { useEffect, useState, useMemo, useCallback } from 'react';
import getCurrentUser from '../actions/getCurrentUser';

const useGetCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const session = useSession();

    const fetchData = useCallback(async () => {
        try {
            const response = await getCurrentUser(session?.data?.user?.email!);
            setCurrentUser(response);
        } catch (error) {
            // Handle error as needed
            console.error('Error fetching user data:', error);
        }
    }, [session]);

    useEffect(() => {
        if (session?.data?.user?.email) fetchData();
    }, [fetchData, session]);

    return useMemo(() => currentUser, [currentUser]);
};

export default useGetCurrentUser;
