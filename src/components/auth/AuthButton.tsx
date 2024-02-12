'use client';
import clsx from 'clsx';
import LoadingSpinner from './LoadingSpinner';

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
                'flex justify-center items-center rounded-md text-sm font-medium leading-6 h-7 w-36 bg-green-theme '
            )}
        >
            {isLoading ? <LoadingSpinner /> : children}
        </button>
    );
};

export default AuthButton;
