import AvatarSection from './Avatar';
import Icons from './Icons';

const Nav = () => {


    return (
        <div className="w-auto bg-search-nav h-10 p-5 flex justify-between items-center">
            <AvatarSection />
            <div className="">
                <Icons />
            </div>
        </div>
    );
};

export default Nav;
