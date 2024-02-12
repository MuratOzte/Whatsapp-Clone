import clsx from 'clsx';
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
}) => {
    return (
        <div className="ml-5">
            <label
                className="text-gray-400 leading-6 font-medium text-sm mt-1 select-none"
                htmlFor={id}
            >
                {label}
            </label>
            <div className="">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    placeholder={placeholder}
                    {...register(id, { required })}
                    className={clsx(
                        `form-input w-full h-7 bg-auth-input border-0 border-b-2 placeholder:text-xs focus:outline-offset focus:border-0 focus:border-b-2 focus:border-auth-green focus:ring-0 focus:border-auth-green focus:ring-offset-0 focus:ring-offset-border-auth-green text-gray-100 text-sm font-medium leading-6 mt-1 select-none placeholder-gray-400 focus:placeholder-transparent`,
                        errors[id] && 'border-red-500',
                        disabled && 'bg-gray-700'
                    )}
                />
            </div>
        </div>
    );
};

export default AuthInput;
