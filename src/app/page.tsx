import dynamic from 'next/dynamic'
import { Suspense } from "react";
import Loading from './loading';
import { getQuizes } from '@/helpers';
import { IQuizListItem } from '@/interfaces';

const QuizListItem = dynamic(() => import('@/components/Quiz/ListItem'))

export default async function Home() {
  const quizes: IQuizListItem[] = await getQuizes();
  return (
    <main className="p-4">
      <Suspense fallback={<Loading />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {quizes && <QuizListItem data={quizes} />}
        </div>
      </Suspense>
    </main>
  );
}
