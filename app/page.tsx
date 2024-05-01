"use client";

import Weather from "./components/Weather";
import Link from 'next/link'

export default function Home() {

  return (
    <main>
      <Weather />
      <Link href="/users" className='text-white flex justify-center m-1.5'>Click here: Users Page</Link>
    </main>
  );
}
