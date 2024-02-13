'use client';
//hooks
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
//components
import {
    AuthButton,
    AuthInput,
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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        if (variant === 'login') {
            const response = await fetch('/api/get-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response.status === 201);
            setIsLoading(false);
        }
        if (variant === 'register') {
            const response = await fetch('/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response);
            setIsLoading(false);
        }
    };

    const socialAction = (data: string) => {
        setIsLoading(true);
    };

    return (
        <div className="absolute md:top-[405px] top-[340px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 h-5/6 bg-gray-800">
            <form
                className="md:mt-5 flex flex-col items-center justify-center h-auto w-full pb-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'register' && (
                    <AuthInput
                        label="name"
                        register={register}
                        id="name"
                        errors={errors}
                        placeholder="Type Your Name"
                        disabled={isLoading}
                    />
                )}
                <AuthInput
                    label="E-mail"
                    register={register}
                    id="email"
                    errors={errors}
                    placeholder="Type Your E-Mail"
                    disabled={isLoading}
                />
                <AuthInput
                    label="Password"
                    register={register}
                    id="password"
                    errors={errors}
                    placeholder="Type Your Password"
                    disabled={isLoading}
                />
                <AuthButton isLoading={isLoading} type={'submit'}>
                    Sign In
                </AuthButton>
            </form>
            {variant == 'login' && (
                <>
                    <Divider />
                    <div className="flex justify-center mt-5 flex-col">
                        <SocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                        <SocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                    </div>
                </>
            )}
            <p className="text-gray-500 text-xs text-center">
                {variant === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                <button
                    disabled={isLoading}
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
