import Logo from '@/assets/logo.png';
import Image from 'next/image';
const Background = () => {
    return (
        <>
            <div className="flex bg-auth-green h-2/6 w-full">
                <div className="mx-auto flex items-center h-1/2 select-none">
                    <Image
                        src={Logo}
                        alt="logo"
                        width={100}
                        height={100}
                        draggable={false}
                    />
                    <p className="text-lg tracking-tight text-white">
                        Whatsapp Web
                    </p>
                </div>
            </div>
            <div className="flex bg-auth-grey h-4/6 w-full" />
        </>
    );
};

export default Background;
