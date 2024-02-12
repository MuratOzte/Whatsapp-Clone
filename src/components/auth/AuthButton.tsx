'use client';
import clsx from 'clsx';
import { LoadingSpinner } from '@/components/index';

interface AuthButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullwidth?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    isLoading?: boolean;
}
const AuthButton: React.FC<AuthButtonProps> = ({
    children,
    danger,
    disabled,
    fullwidth,
    onClick,
    secondary,
    type,
    isLoading,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(
                'flex justify-center items-center rounded-md mt-3 text-sm font-medium leading-6 h-7 w-36 bg-green-theme hover:scale-105 transition-transform ease-out duration-300',
                disabled && 'opacity-50 cursor-not-allowed',
                isLoading && 'bg-green-300',
                fullwidth && 'w-full',
                secondary ? 'bg-gray-800' : 'text-white',
                danger &&
                    'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600'
            )}
        >
            {isLoading ? <LoadingSpinner /> : children}
        </button>
    );
};

export default AuthButton;
