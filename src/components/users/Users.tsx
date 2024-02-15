import { UsersHeader, UsersSearch } from '@/components/index';
import UserContainer from './UserContainer';
const Users = () => {
    return (
        <>
            <UsersHeader />
            <UsersSearch />
            <div className="mt-1 overflow-y-auto h-5/6">
                <UserContainer />
                <UserContainer />
                <UserContainer />
                <UserContainer />
                <UserContainer />
                <UserContainer />
                <UserContainer />
                <UserContainer />
                <UserContainer />
                <UserContainer />
                <UserContainer />
            </div>
        </>
    );
};

export default Users;
