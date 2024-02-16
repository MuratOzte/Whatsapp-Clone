//hooks
import { useDispatch } from 'react-redux';
//components
import { AvatarSection, UsersDivider } from '..';
//slices
import uiSlice from '@/store/slices/uiSlice';
import useCreateConversation from '@/app/hooks/useCreateConversation';

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
    const dispatch = useDispatch();
    const createConversation = useCreateConversation();

    return (
        <div
            className="w-full my-3"
            onClick={() => {
                dispatch(uiSlice.actions.openMessage({ id, name }));
                createConversation();
                console.log(id, name);
            }}
        >
            <div className="h-[10%] w-full items-center flex ml-5">
                <AvatarSection />
                <p className="ml-7 text-gray-400">{name}</p>
            </div>
            <UsersDivider />
        </div>
    );
};

export default UserContainer;
