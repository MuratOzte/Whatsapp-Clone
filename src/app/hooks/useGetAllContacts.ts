import { useSession } from 'next-auth/react';
import { useEffect, useState, useMemo, useCallback } from 'react';

const useGetAllContacts = () => {
    const [contacts, setContacts] = useState([]);
    const session = useSession();

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch('/api/get-users/get-all-contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: session?.data?.user?.email }),
            });
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }, [session.data]);

    useEffect(() => {
        if (session?.data?.user?.email) fetchData();
    }, [fetchData, session]);

    return useMemo(() => contacts, [session, contacts]);
};

export default useGetAllContacts;
