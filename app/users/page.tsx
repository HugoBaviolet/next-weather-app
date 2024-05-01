import React from 'react'
import Link from 'next/link'

interface User {
    id: number;
    name: string;
    email: string;
}

const UsersPage = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/',
     //this is if we have constantly changing data
     {cache: 'no-store'})
     //get data every 10 seconds // does not work with axios
     //{next: {revalidate:10}})
    const users:User[] = await res.json()
  return (
    <div className='text-white'>
    <h1 className='flex justify-center'>Dummy User Data</h1>
    <h2 className='flex justify-center text-sm mt-2 mb-2'>I have added this page for learning how to create different endpoints and link pages</h2>
    <table className='table table-bordered'>
        <thead className='text-white'>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
        {users.map(user => <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        </tr>)}
        </tbody>
    </table>
    <Link href="/">Click Here: Weather App </Link>
    </div>
  )
}

export default UsersPage