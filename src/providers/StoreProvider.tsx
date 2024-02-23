'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type Store, createAppStore } from '@/store'

export const StoreContext = createContext<StoreApi<Store> | null>(
    null,
)

export interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({
    children,
}: StoreProviderProps) => {
    const storeRef = useRef<StoreApi<Store>>()
    if (!storeRef.current) {
        storeRef.current = createAppStore()
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    )
}

export const useAppStore = <T,>(
    selector: (store: Store) => T,
): T => {
    const storeContext = useContext(StoreContext)

    if (!storeContext) {
        throw new Error(`useStore must be use within StoreProvider`)
    }

    return useStore(storeContext, selector)
}