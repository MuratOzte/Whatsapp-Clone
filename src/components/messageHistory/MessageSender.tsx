interface OldMessageSenderProps {
    session: any;
    e: any;
}

const OldMessageSender: React.FC<OldMessageSenderProps> = ({ session, e }) => {
    return (
        <p className=" text-lg text-gray-400 ">
            {e.members.filter(
                (member: any) => member !== session.data?.user?.name
            )}
        </p>
    );
};

export default OldMessageSender;
