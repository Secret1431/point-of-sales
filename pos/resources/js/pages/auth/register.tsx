import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, User, Lock } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem 
} from "@/components/ui/select";

import BgImage from '../../assets/Bg.png';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    role: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        role: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative flex flex-col items-center min-h-screen bg-slate-100 bg-cover bg-center font-[Montsarrat]"
            style={{ backgroundImage: `url(${BgImage})`}}
        >
            <div className='flex flex-col w-full max-w-4xl p-4 sm:p-5'>

                <div className='flex flex-col sm:flex-row justify-center gap-4'>
                    <div className='w-full lg:w-2/4 bg-white border border-gray-300 p-6 shadow rounded-lg space-y-4'>
                        <div>
                            <h2 className='text-slate-600 font-bold'>
                                Register Form
                            </h2>
                            <p className='text-slate-500 font-medium'>
                                This is the register form
                            </p>
                        </div>

                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Full name"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <div className='relative flex items-center'>
                                        <User className='absolute left-3 w-4 h-4' />
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                            placeholder="email@example.com"
                                            className='pl-9'
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className='relative flex items-center'>
                                        <Lock className='absolute left-3 w-4 h-4' />
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            disabled={processing}
                                            placeholder="Password"
                                            className='pl-9'
                                        />
                                        <InputError message={errors.password} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirm password"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm password</Label>
                                    <Select value={data.role} onValueChange={(val) => setData("role", val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Filtered by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='suppliers'>Supplier</SelectItem>
                                            <Select value='stockman'>Stock Man</Select>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button type="submit" className="mt-2 w-full bg-green-800 hover:bg-green-700" tabIndex={5} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Create account
                                </Button>
                            </div>

                            <div className="text-muted-foreground text-center text-sm">
                                Already have an account?{' '}
                                <TextLink href={route('login')} tabIndex={6}>
                                    Log in
                                </TextLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
