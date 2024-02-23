import { IUserLoginData } from "@/interfaces";
import { useAppStore } from "@/providers/StoreProvider";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormProps {
    onSubmit: ({ login, password }: IUserLoginData) => void
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const { error, isLoading } = useAppStore((state) => state)
    const router = useRouter();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        await onSubmit({ login, password });
        if (error === null) {
            router.push('/');
        }
    }
    return (
        <form className="flex flex-col justify-center gap-4 text-center" onSubmit={handleSubmit}>
            <Input value={login} onChange={(e) => setLogin(e.target.value)} label="Логин" required />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} label="Пароль" type="password" required />
            <Link className="text-blue-500 underline" href="">Забыли пароль?</Link>
            <Button type="submit" color="primary" size="lg" isDisabled={isLoading}>Войти</Button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}
