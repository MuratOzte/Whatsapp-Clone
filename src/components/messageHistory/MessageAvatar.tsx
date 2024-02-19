interface OldMessageAvatarProps {
    e: any;
    session: any;
}

const OldMessageAvatar: React.FC<OldMessageAvatarProps> = ({ e, session }) => {
    return (
        <div className="inline-flex items-center justify-center w-8 h-8 text-sm text-white bg-search-nav rounded-full ml-2 ">
            {
                e.members
                    .filter(
                        (member: string) => member !== session.data?.user?.name
                    )
                    .toString()[0]
            }
        </div>
    );
};

export default OldMessageAvatar;
