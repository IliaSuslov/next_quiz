'use client'
import React from "react";
import { Card, Tab, Tabs } from "@nextui-org/react";
import LoginForm from "@/components/Login/LoginForm";
import { useAppStore } from "@/providers/StoreProvider";

export default function Login() {
    const { login, register } = useAppStore((state) => state)
    return (
        <Card className="flex flex-col m-auto mt-12 p-2 max-w-[400px]">
            <Tabs aria-label="Dynamic tabs" >
                <Tab title="Логин">
                    <LoginForm onSubmit={login} />
                </Tab>
                <Tab title="Регистрация">
                    <LoginForm onSubmit={register} />
                </Tab>
            </Tabs>
        </Card>
    );
}
