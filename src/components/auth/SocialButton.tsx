import { IconType } from 'react-icons';

interface SocialButtonProps {
    icon: IconType;
    onClick: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon: Icon, onClick }) => {
    return (
        <button className="inline-flex w-1/2 justify-center m-auto  mb-2 rounded-md bg-gray-500 py-1 hover:bg-green-theme transition-colors ease-out duration-200">
            <Icon />
        </button>
    );
};

export default SocialButton;
