import { AvatarSection, UsersDivider } from '..';

const UserContainer = () => {
    return (
        <>
            <div className="h-[10%] w-full mt-1 items-center flex">
                <AvatarSection />
                <p className="ml-7 text-gray-400">Murat</p>
            </div>
            <UsersDivider />
        </>
    );
};

export default UserContainer;
