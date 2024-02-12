import AvatarSection from './Avatar';
import Icons from './Icons';
const Nav = () => {
    return (
        <div className="w-auto bg-gray-800 h-10 m-2 p-3 rounded-lg flex justify-between items-center">
            <AvatarSection />
            <div className="">
                <Icons />
            </div>
        </div>
    );
};

export default Nav;
