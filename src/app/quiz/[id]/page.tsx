import Loading from '@/app/loading'
import QuizItem from '@/components/Quiz'
import { getQuiz } from '@/helpers'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Quiz({ params: { id } }: { params: { id: number } }) {
    const quiz = await getQuiz(id)
    return (
        <>
            <Link href="/" className='p-2'>Назад</Link>
            <Suspense fallback={<Loading />}>
                <div className='flex justify-center'>
                    <QuizItem quiz={quiz} />
                </div>
            </Suspense>
        </>

    )
}
