import { IUserData, IUserLoginData } from '@/interfaces'
import { createStore } from 'zustand/vanilla'
import {
    setCookie,
    deleteCookie,
} from "cookies-next";

export const API_URL = 'http://93.183.72.61:3003'

export type State = {
    userData: IUserData,
    error: string | null,
    isLoading: boolean
}

export type Actions = {
    login: (data: IUserLoginData) => void,
    logout: () => void,
    register: (data: IUserLoginData) => void,
    init: (login: string | null) => void,
}

export type Store = State & Actions

export const defaultInitState: State = {
    userData: {},
    error: null,
    isLoading: false,
}

export const createAppStore = (
    initState: State = defaultInitState,
) => {
    return createStore<Store>()((set) => ({
        ...initState,
        init: (login: string | null) => {
            if (typeof login == 'string') {
                set({ userData: { login: login } })
            }
        },
        login: async (data) => {
            set({ isLoading: true })
            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                if (response.ok) {
                    const res = await response.json()
                    const { id, Answers, jwt, login } = res

                    setCookie("token", jwt, { httpOnly: true })
                    localStorage.setItem("login", login)
                    set({ userData: { id, answers: Answers, login }, error: null, isLoading: false })
                } else {
                    const error = await response.text()
                    set({ error, isLoading: false })
                }
            } catch (err: any) {
                set({ error: err, isLoading: false })
            }
        },
        logout: () => {
            try {
                fetch(`${API_URL}/logout`)
                deleteCookie("token")
                localStorage.removeItem("login")
                set({ userData: {} })
            } catch (err: any) {
                set({ error: err })
            }
        },
        register: async (data) => {
            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                if (response.ok) {
                    const res = await response.json()
                    const { id, login, jwt } = res
                    setCookie("token", jwt, { httpOnly: true })
                    localStorage.setItem("login", login)
                    set({ userData: { id, answers: [], login }, error: null, isLoading: false })
                } else {
                    const error = await response.text()
                    set({ error, isLoading: false })
                }
            } catch (err: any) {
                set({ error: err.message, isLoading: false })
            }
        }
    }))
}