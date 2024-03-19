import clsx from 'clsx';
import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface AuthInputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
    placeholder: string;
    value?: string;
    getVal: any;
}

const AuthInput: React.FC<AuthInputProps> = ({
    label,
    errors,
    id,
    register,
    disabled,
    required,
    type,
    placeholder,
    getVal,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const value = getVal(); 

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className="my-3 relative">
            <label
                className={clsx(
                    'absolute text-gray-400 leading-6 font-medium text-[16px] mt-1 transition-transform translate-x-2',
                    isFocused || value
                        ? 'translate-y-[-32px]'
                        : 'translate-y-[-5px] cursor-text',
                    'select-none'
                )}
                htmlFor={id}
            >
                {label}
            </label>
            <div>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={clsx(
                        `form-input w-full h-7 bg-auth-input border-0 border-b-2 placeholder:text-xs focus:outline-offset focus:border-0 focus:border-b-2 focus:border-auth-green focus:ring-0 focus:border-auth-green focus:ring-offset-0 focus:ring-offset-border-auth-green text-gray-100 text-sm font-medium leading-6 select-none placeholder-gray-400 focus:placeholder-transparent focus:placeholder-gray-400`,
                        !isFocused && 'placeholder:opacity-0',
                        errors[id] && 'border-red-500',
                        disabled && 'bg-gray-700'
                    )}
                />
            </div>
        </div>
    );
};

export default AuthInput;
