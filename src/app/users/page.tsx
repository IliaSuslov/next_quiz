import { getUsers } from '@/helpers';
import { IUser } from '@/interfaces';
import React from 'react'

export default async function Users() {
    const users: IUser[] = await getUsers();
    return (
        <div className='p-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2'>{
            users.map(u => {
                return (
                    <div key={u.id} className='border p-2'>
                        <p>Пользователь: {u.login}</p>
                        <p>Ответы: {u.Answers.length}</p>
                    </div>
                )
            })
        }</div>
    )
}
