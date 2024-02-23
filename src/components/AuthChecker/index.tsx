"use client";

import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppStore } from "@/providers/StoreProvider";
import Loading from "@/app/loading";

export function AuthChecker({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const { init, userData, } = useAppStore((state) => state)
    const [isLoading, appIsLoading] = useState(true)

    useEffect(() => {
        if (typeof localStorage !== 'undefined') {
            init(localStorage.getItem('login'))
        }
        appIsLoading(false)
    }, [init,]);

    useEffect(() => {
        if (pathname !== "/login" && !userData.login && !localStorage.getItem('login')) {
            redirect("/login");
        }

    }, [pathname, userData]);
    if (isLoading) return <Loading />
    return <>{children}</>
}
