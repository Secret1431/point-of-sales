import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Lock, User } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BgImage from '../../assets/Bg.png';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-slate-100 bg-cover bg-center font-[Montsarrat]"
            style={{ backgroundImage: `url(${BgImage})`}}
        >
            <div className='flex flex-col w-full max-w-4xl p-4 sm:p-5'>

                <div className='flex flex-col sm:flex-row justify-center items-center'>
                    <div className='w-full lg:w-2/4 bg-white border border-gray-300 shadow rounded-lg p-6 mt-22'>
                        <div>
                            <h2 className='text-slate-600 font-bold'>
                                Login form
                            </h2>
                            <p className='text-slate-500 font-medium'>
                                This is login form
                            </p>
                        </div>

                        <div>
                            <form className="flex flex-col gap-6" onSubmit={submit}>
                                <div className="grid gap-6 mt-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <div className='relative flex items-center'>
                                            <User className='absolute left-3 h-4 w-4' />
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="email@example.com"
                                                className='pl-9'
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password" >
                                                <span>Password</span>
                                            </Label>
                                        </div>
                                        <div className='relative flex items-center'>
                                            <Lock className='absolute left-3 h-4 w-4 text-gray-400 pointer-events-none' />
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Password"
                                                className='pl-9'
                                            />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center justify-between space-x-3">
                                        <Checkbox id="remember" name="remember" tabIndex={3} />
                                        <Label htmlFor="remember">Remember me</Label>
                                         {canResetPassword && (
                                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                    </div>

                                    <Button type="submit" className="w-full bg-green-800 hover:bg-green-700" disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Log in
                                    </Button>
                                </div>

                                <div className="text-muted-foreground text-center text-sm">
                                    Don't have an account?{' '}
                                    <TextLink href={route('register')} tabIndex={5}>
                                        Sign up
                                    </TextLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
