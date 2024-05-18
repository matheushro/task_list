'use client'

import { Button } from '@/components/ui/button';
import {useSession, signIn, signOut} from 'next-auth/react'

export default function Home() {
  return (

    <button onClick={() => signIn('google')}>Sign In</button>

  );
}
