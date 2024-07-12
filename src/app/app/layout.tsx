import { PropsWithChildren } from "react";
import { auth } from '@/services/auth'
import Sidebar from "./_components/sidebar";

export default async function Layout({children}: PropsWithChildren){
    const session = await auth()

    return (
        <div className="grid lg:grid-cols-[16rem_1fr] gap-4">
            <Sidebar />
            <main className="p-10 pt-24">
                {children}
            </main>
        </div>
    )
}