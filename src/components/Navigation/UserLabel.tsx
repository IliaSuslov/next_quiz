'use client'

import { useAppStore } from "@/providers/StoreProvider";
import { useEffect, useState } from "react";

export default function UserLabel() {
    const { userData } = useAppStore((state) => state)

    if (!userData.login) return
    return <p>Пользователь: {userData.login}</p>
}
