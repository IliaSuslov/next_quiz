'use client'

import { useAppStore } from "@/providers/StoreProvider";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation'

export default function Logout() {
    const { logout, userData } = useAppStore((state) => state)
    const router = useRouter()

    async function handleLogout() {
        await logout()
        router.push('/login')
    }

    if (!userData.login) return
    return (
        <Button color="primary" onClick={handleLogout}>Logout</Button>
    )
}
