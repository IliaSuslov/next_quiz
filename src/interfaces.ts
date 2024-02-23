export interface IUserLoginData {
    login: string;
    password: string;
}
export interface IUserData {
    login?: string,
    answers?: string[],
    id?: number
}
export interface IError {
    message?: string,
    status?: number
}
export interface IQuiz {
    id?: number,
    name?: string,
    questions?: { answers: string[], question: string }[]
}
export interface IQuizListItem {
    id: number,
    name: string
}
export interface IUser {
    id: number,
    login: string,
    jwt: string,
    Answers: []
}