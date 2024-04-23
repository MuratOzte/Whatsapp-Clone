//hooks
import { useDispatch } from 'react-redux';
//components
import { AvatarSection, UsersDivider } from '..';
//slices
import useCreateConversation from '@/app/hooks/useCreateConversation';
import uiSlice from '@/store/slices/uiSlice';
import { useSession } from 'next-auth/react';

interface userContainerProps {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    status?: string;
    lastSeen?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

const UserContainer: React.FC<userContainerProps> = ({ id, name }) => {
    const session = useSession();
    const dispatch = useDispatch();
    const createConversation = useCreateConversation();

    return (
        <div
            className="md:w-1/3 w-full my-3"
            onClick={() => {
                dispatch(uiSlice.actions.toggleAllUserModal());
                dispatch(uiSlice.actions.openMessage({ name }));
                dispatch(
                    uiSlice.actions.setCurrentUserName(
                        session.data?.user?.name!
                    )
                );
                createConversation(session.data?.user?.name!, name!);
            }}
        >
            <div className="h-[10%] w-full items-center flex ml-5">
                <AvatarSection name={name} />
                <p className="text-gray-500">{name}</p>
            </div>
            <UsersDivider />
        </div>
    );
};

export default UserContainer;
