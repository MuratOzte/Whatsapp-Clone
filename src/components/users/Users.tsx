//components
import { UsersHeader, UsersSearch, UserContainer } from '@/components/index';
import { Suspense } from 'react';
//hooks
import useGetAllContacts from '@/app/hooks/useGetAllContacts';
//models
import { User } from '@/models/User';
const Users = () => {
    const allContacts: User[] = useGetAllContacts();

    return (
        <>
            <UsersHeader />
            <UsersSearch />
            <div className="mt-1 overflow-y-auto overflow-x-hidden h-5/6">
                <Suspense
                    fallback={
                        <div className="w-full h-full text-white">Loading</div>
                    }
                >
                    {allContacts.map((contact) => (
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
                </Suspense>
            </div>
        </>
    );
};

export default Users;
