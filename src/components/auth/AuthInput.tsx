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
}

const AuthInput: React.FC<AuthInputProps> = ({
    label,
    errors,
    id,
    register,
    disabled,
    required,
    type,
}) => {
    return (
        <div>
            <label
                className="text-gray-400 leading-6 font-medium text-sm"
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
};

export default AuthInput;
