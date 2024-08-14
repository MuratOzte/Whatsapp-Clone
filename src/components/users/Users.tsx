//components
import { UserContainer, UsersHeader, UsersSearch } from '@/components/index';
//hooks
import useGetAllContacts from '@/app/hooks/useGetAllContacts';
//models
import { User } from '@/models/User';
import Loading from '../common/Loading';

const Users = () => {
    const allContacts: User[] = useGetAllContacts();

    return (
        <>
            <UsersHeader />
            <UsersSearch />
            <div className="mt-1 overflow-y-auto overflow-x-hidden absolute w-full">
                {!allContacts ||
                    (allContacts.length === 0 && (
                        <div className="flex items-center justify-center h-full w-full">
                            <Loading />
                        </div>
                    ))}
                {allContacts &&
                    allContacts.map((contact) => (
                        <UserContainer
                            key={contact.id}
                            id={contact.id}
                            name={contact.name}
                            email={contact.email}
                            avatar={contact.avatar}
                            status={contact.status}
                            lastSeen={contact.lastSeen}
                            createdAt={contact.createdAt}
                            updatedAt={contact.updatedAt}
                            __v={contact.__v}
                        />
                    ))}
            </div>
        </>
    );
};

export default Users;
