import { API_URL } from "./store"

export async function getQuiz(quizId: number) {
    const response = await fetch(`${API_URL}/quiz/${quizId}`)
    const data = await response.json()
    return data
}

export async function getQuizes() {
    const response = await fetch(`${API_URL}/quiz`)
    const data = await response.json()
    return data
}

export async function getUsers() {
    const response = await fetch(`${API_URL}/get-users`)
    const data = await response.json()
    return data
}