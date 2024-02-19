'use client';
//functiıns
import axios from 'axios';
//hooks
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
//components
import {
    AuthButton,
    AuthInput,
    Divider,
    SocialButton,
} from '@/components/index';

import { BsGithub, BsGoogle } from 'react-icons/bs';
import toast from 'react-hot-toast';

import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

type Variant = 'login' | 'register';

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();

    const [variant, setVariant] = useState<Variant>('login');
    const [isLoading, setIsLoading] = useState(false);

    const variantToggler = useCallback(() => {
        setVariant(variant === 'login' ? 'register' : 'login');
    }, [variant]);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/messages');
        }
    }, [session?.status, router]);
    const {
        register,
        handleSubmit,
        getValues,
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
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((res) => {
                    if (res?.error) {
                        toast.error('Invalid Credentials');
                    }
                    if (res?.ok || !res?.error) {
                        router.push('/messages');
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        if (variant === 'register') {
            await axios.post('/api/register', data).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error);
                }
                if (res.data.ok) {
                    toast.success('Registered Successfully');
                    router.refresh();
                }
            });
            setIsLoading(false);
        }
    };

    const socialAction = (data: string) => {
        signIn(data, {
            redirect: false,
        }).then((res) => {
            if (res?.error) {
                toast.error('Something Went Wrong');
            }
            if (res?.ok || !res?.error) {
                toast.success('Logged In Successfully');
            }
        });
    };

    return (
        <div className="absolute  md:top-[405px] top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 h-5/6 bg-gray-800">
            <form
                className="mt-20 md:mt-12 flex flex-col items-center justify-center h-auto w-full pb-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'register' && (
                    <AuthInput
                        label="name"
                        register={register}
                        id="name"
                        getVal={() => getValues('name')}
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
                    getVal={() => getValues('email')}
                    placeholder="Type Your E-Mail"
                    disabled={isLoading}
                />
                <AuthInput
                    label="Password"
                    register={register}
                    id="password"
                    getVal={() => getValues('password')}
                    errors={errors}
                    placeholder="Type Your Password"
                    disabled={isLoading}
                />
                <AuthButton isLoading={isLoading} type={'submit'}>
                    {variant === 'login' ? 'Sign In' : 'Sign Up'}
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
