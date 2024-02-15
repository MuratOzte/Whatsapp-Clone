import { IoArrowBack } from 'react-icons/io5';

const UsersHeader = () => {
    return (
        <>
            <div className="w-full h-[10%] bg-search-nav items-center flex justify-start">
                <IoArrowBack
                    color="gray"
                    className="mx-3 cursor-pointer hover:transform scale-125 transition-all duration-200"
                />
            </div>
        </>
    );
};

export default UsersHeader;
