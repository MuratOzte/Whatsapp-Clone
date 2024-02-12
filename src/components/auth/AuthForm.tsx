'use client';
//hooks
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
//components
import {
    AuthInput,
    AuthButton,
    Divider,
    SocialButton,
} from '@/components/index';

import { BsGithub, BsGoogle } from 'react-icons/bs';

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
                className="my-5 flex flex-col items-center justify-center h-auto w-full lg:px-10 lg:py-10 mt-5"
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
                <AuthButton isLoading={isLoading} type={'submit'}>
                    Sign In
                </AuthButton>
            </form>
            <Divider />
            <div className="flex justify-center mt-5 flex-col">
                <SocialButton
                    icon={BsGoogle}
                    onClick={() => socialAction('google')}
                />
            </div>
            <p className="text-gray-500">
                {variant === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                <button
                    onClick={variantToggler}
                    className="text-auth-green font-semibold ml-1"
                >
                    {variant === 'login' ? 'Register' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
