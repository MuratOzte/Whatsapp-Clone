import { useSession } from 'next-auth/react';

interface AvatarSectionProps {
    name?: string;
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ name }) => {
    const session = useSession();
    return (
        <div className="inline-flex items-center justify-center w-8 h-8 text-sm text-white bg-gray-700 rounded-full ml-1 mr-3">
            {!name && session.data?.user?.name?.charAt(0)}
            {name && name.charAt(0)}
        </div>
    );
};

export default AvatarSection;
