import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useSWR from 'swr';

interface Messages {
    message: string;
    sender: string;
    receiver: string;
}

const fetcher = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const OldMessageContainer = () => {
    const session = useSession();
    const url = `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations.json`;

    const { data, error } = useSWR(url, fetcher, {
        refreshInterval: 1,
        keepPreviousData: true,
    });

    let conversationss: string[] = [];

    if (data) {
        Object.keys(data).map((key) =>
            data[key].members.forEach((member: any) => {
                if (member === session.data?.user?.name) {
                    conversationss.push(data[key]);
                }
            })
        );
    }

    const conversationLength = (data: string[]) => {
        return Object.keys(data).length - 1;
    };

    return (
        <>
            {conversationss && (
                <ul>
                    {conversationss.map((e: any, index) => (
                        <li key={`${index}`}>
                            <>
                                <p>
                                    {e.members.filter(
                                        (member: any) =>
                                            member !== session.data?.user?.name
                                    )}
                                </p>
                                {console.log(
                                    Object.keys(e.messages).length - 1
                                )}
                                <p>
                                    {
                                        (
                                            Object.values(
                                                e.messages
                                            ) as Messages[]
                                        )[conversationLength(e.messages)]
                                            ?.message
                                    }
                                </p>
                            </>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default OldMessageContainer;
