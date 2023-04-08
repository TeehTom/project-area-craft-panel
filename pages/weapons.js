import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import FindWeapon from '@/views/FindWeapon'
import WeaponProvider from '@/providers/WeaponProvider';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Project Area - Lister armes</title>
                <meta name="description" content="weapons" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <WeaponProvider>
                    <FindWeapon/>
                </WeaponProvider>
            </main>
        </>
    )
}
