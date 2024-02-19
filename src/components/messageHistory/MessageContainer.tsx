//hooks
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
//components
import Loading from '../common/Loading';
import uiSlice from '@/store/slices/uiSlice';
//Types
import { RootState } from '@/store/store';
//components
import OldTextContent from './TextContent';
import OldMessageTime from './MessageTime';
import OldMessageSender from './MessageSender';
import OldMessageAvatar from './MessageAvatar';

export interface Messages {
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
    const dispatch = useDispatch();
    const url = `https://wp-clone-414202-default-rtdb.europe-west1.firebasedatabase.app/conversations.json`;
    const selectedData = useSelector((state: RootState) => state.ui);

    const { data, error, isLoading } = useSWR(url, fetcher, {
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
            {isLoading && (
                <div className="flex items-center justify-center h-full w-full">
                    <Loading />
                </div>
            )}
            {conversationss && (
                <ul>
                    {conversationss.map((e: any, index) => (
                        <li
                            className={`${
                                selectedData.openedMessageName ===
                                e.members
                                    .filter(
                                        (member: string) =>
                                            member !== session.data?.user?.name
                                    )
                                    ?.toString()
                                    ? 'bg-gray-700'
                                    : ''
                            }`}
                            key={`${index}`}
                            onClick={() => {
                                dispatch(
                                    uiSlice.actions.setCurrentUserName(
                                        session.data?.user?.name!
                                    )
                                );

                                dispatch(
                                    uiSlice.actions.openMessage({
                                        name: e.members
                                            .filter(
                                                (member: string) =>
                                                    member !==
                                                    session.data?.user?.name
                                            )
                                            .toString(),
                                    })
                                );
                            }}
                        >
                            <div className="flex items-center mt-2 border-b-[0.5px] border-b-gray-500">
                                <OldMessageAvatar
                                    e={e}
                                    session={session}
                                    key={index + 'avatar'}
                                />
                                <div className="w-10/12 ml-2 mb-2">
                                    <div className="flex text-center items-center justify-between mr-5">
                                        <OldMessageSender
                                            session={session}
                                            e={e}
                                            key={index + 'sender'}
                                        />
                                        <OldMessageTime
                                            key={index + 'time'}
                                            conversationLength={
                                                conversationLength
                                            }
                                            e={e}
                                        />
                                    </div>
                                    <OldTextContent
                                        key={index + 'text'}
                                        e={e}
                                        conversationLength={conversationLength}
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default OldMessageContainer;
