// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-50 font-[Montsarrat]'>
            <div className='flex flex-col w-full max-w-4xl p-4 sm:p-5'>
                <div className='flex flex-col sm:flex-row justify-center gap-4'>
                    <div className='w-full lg:w-2/4 bg-white border border-gray-300 p-6 shadow rounded-lg mt-32 space-y-4'>
                        <div>
                            <h2 className='text-slate-600 font-bold'>
                                Forgot password
                            </h2>
                            <p className='text-slate-500 font-medium'>
                                This is the forgot password
                            </p>
                        </div>
                        <div className="space-y-6">
                            <form onSubmit={submit}>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        value={data.email}
                                        autoFocus
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="my-6 flex items-center justify-start">
                                    <Button className="w-full bg-green-800 hover:bg-green-700" disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                        Email password reset link
                                    </Button>
                                </div>
                            </form>

                            <div className="text-muted-foreground space-x-1 text-center text-sm">
                                <span>Or, return to</span>
                                <TextLink href={route('login')}>log in</TextLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
