'use client';
//hooks
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
//components
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

type Variant = 'login' | 'register';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('login');
    const [isLoading, setIsLoading] = useState(false);

    const variantToggler = useCallback(() => {
        setVariant(variant === 'login' ? 'register' : 'login');
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === 'login') {
            console.log('Login:', data);
        }
        if (variant === 'register') {
            console.log('Register:', data);
        }
    };

    const socialAction = (data: string) => {
        setIsLoading(true);
    };

    return (
        <div className="absolute top-[405px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 h-5/6 bg-gray-800">
            <form
                className="space-y-6 flex flex-col items-center justify-center h-full w-full lg:px-10 lg:py-10 sm:p-0"
                onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'register' && (
                    <AuthInput
                        label="name"
                        register={register}
                        id="name"
                        errors={errors}
                        placeholder="Type Your Name"
                    />
                )}
                <AuthInput
                    label="E-mail"
                    register={register}
                    id="email"
                    errors={errors}
                    placeholder="Type Your E-Mail"
                />
                <AuthInput
                    label="Password"
                    register={register}
                    id="password"
                    errors={errors}
                    placeholder="Type Your Password"
                />
                <AuthButton isLoading={true}>Test</AuthButton>
            </form>
        </div>
    );
};

export default AuthForm;
