//hooks
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
//components
import Loading from '../common/Loading';
import uiSlice from '@/store/slices/uiSlice';
//Types
import { RootState } from '@/store/store';

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
                                <div className="inline-flex items-center justify-center w-8 h-8 text-sm text-white bg-search-nav rounded-full ml-2">
                                    {
                                        e.members
                                            .filter(
                                                (member: string) =>
                                                    member !==
                                                    session.data?.user?.name
                                            )
                                            .toString()[0]
                                    }
                                </div>
                                <div className="w-10/12 ml-2 mb-2">
                                    <div className="flex text-center items-center justify-between mr-5">
                                        <p className=" text-lg text-gray-400">
                                            {e.members.filter(
                                                (member: any) =>
                                                    member !==
                                                    session.data?.user?.name
                                            )}
                                        </p>
                                        <p className="w-4/12 overflow-hidden text-[10px] text-gray-500 text-right">
                                            {Object.keys(e.messages)
                                                [
                                                    conversationLength(
                                                        e.messages
                                                    )
                                                ].split(' at ')[1]
                                                .split(':')
                                                .slice(0, 2)
                                                .join(':')}
                                        </p>
                                    </div>
                                    <p className="w-11/12 overflow-hidden text-sm text-gray-500">
                                        {
                                            (
                                                Object.values(
                                                    e.messages
                                                ) as Messages[]
                                            )[conversationLength(e.messages)]
                                                ?.message
                                        }
                                    </p>
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
