import "../../../../styles/global.scss"
import React from 'react'
import AuthGuard from './guard/AuthGuard'
import Header from '@/UI/organisms/head/head'
import NavBar from '@/UI/organisms/navbar/navbar'

export default function PrivateLayout(
    { children }: { children: React.ReactNode}
) {
  return (
    <AuthGuard>
        <Header/>
        <div className="main">
        <NavBar/>
        {children}
        </div>
        </AuthGuard>
  )
}