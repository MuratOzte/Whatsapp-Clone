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
            <div className="mt-1 overflow-y-auto h-5/6">
                <Suspense
                    fallback={
                        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
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
