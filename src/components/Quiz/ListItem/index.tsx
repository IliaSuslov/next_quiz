import { getQuiz } from '@/helpers'
import { IQuiz, IQuizListItem } from '@/interfaces'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

async function getQuestionNumber(quizId: number) {
    const data: IQuiz = await getQuiz(quizId)
    return data?.questions?.length
}

export default async function QuizListItem({ data }: { data: IQuizListItem[] }) {
    return (
        data.map((v) => {
            return (
                <div className="flex flex-col gap-2 p-2 border text-center" key={v.id}>
                    <p>{v.name}</p>
                    <p>Количество вопросов: {getQuestionNumber(v.id)}</p>
                    <Link href={`/quiz/${v.id}`} >
                        <Button color="primary">
                            Начать Тест
                        </Button>
                    </Link>
                </div>
            )
        })
    )
}
