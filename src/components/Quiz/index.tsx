'use client'

import { Card, Button, RadioGroup, Radio } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { IQuiz } from '@/interfaces';

function getAnswersFromLS(id: number): string[] {
    const quizAnswers = localStorage.getItem(String(id))
    const dataArray = quizAnswers?.split(',')
    return dataArray ?? []
}

export default function QuizItem({ quiz }: { quiz: IQuiz }) {
    const [step, setStep] = useState(0)
    const [selectedAnswers, setAnswers] = useState<string[]>([])
    const [loadingAnswers, setOldAnswers] = useState<boolean>(true)
    const [isQuizCompleted, setCompleted] = useState<boolean>(false)
    const isLastStep = step + 1 === quiz?.questions?.length
    const allQuestionsAnswered = selectedAnswers?.length === quiz?.questions?.length
    useEffect(() => {
        if (quiz.id && typeof localStorage !== 'undefined' && localStorage.getItem(String(quiz.id))) {
            setAnswers(getAnswersFromLS(quiz.id))
            setCompleted(true)
            setOldAnswers(false)
        } else {
            setOldAnswers(false)
        }

    }, [quiz.id])

    function handleNextQ() {
        if (!isLastStep) {
            setStep(prev => prev + 1)
        }
    }
    function handlePrevQ() {
        if (step > 0) {
            setStep(prev => prev - 1)
        }
    }
    function handleSelectAnswer(step: number) {
        return (value: string) => {
            const newArray = [...selectedAnswers]
            newArray[step] = value
            setAnswers(newArray)
        }
    }
    function handleSubmit() {
        quiz.id && localStorage.setItem(String(quiz.id), String(selectedAnswers))
    }

    if (!quiz.questions || loadingAnswers) return <Loading />
    return (
        <Card className='flex justify-center gap-4 mt-4 p-4 md:w-1/3 m-2'>
            {`${step + 1} / ${quiz?.questions?.length}`}
            <p className='text-center'>{quiz?.questions?.[step]?.question}</p>
            <RadioGroup
                value={selectedAnswers[step]}
                onValueChange={handleSelectAnswer(step)}
            >
                {quiz?.questions?.[step].answers?.map(q => {
                    return <Radio value={q} key={q}>{q}</Radio>
                })}
            </RadioGroup>
            {isQuizCompleted && <p>Вы прошли этот опрос</p>}
            <div className='flex justify-center gap-2'>
                <Button color='danger' onClick={handlePrevQ} isDisabled={step == 0}>Назад</Button>
                {!isLastStep
                    ? <Button color='primary' onClick={handleNextQ} isDisabled={isLastStep}>Следующий вопрос</Button>
                    : <Button color='success' onClick={handleSubmit} isDisabled={!allQuestionsAnswered || isQuizCompleted}>Отправить ответы</Button>
                }
            </div>
        </Card >
    )
}
