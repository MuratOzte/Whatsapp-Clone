import { AvatarSection, UsersDivider } from '..';

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
    return (
        <>
            <div className="h-[10%] w-full mt-1 items-center flex">
                <AvatarSection />
                <p className="ml-7 text-gray-400">{name}</p>
            </div>
            <UsersDivider />
        </>
    );
};

export default UserContainer;
