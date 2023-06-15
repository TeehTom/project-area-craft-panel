import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import MapStalker from '@/views/MapStalker'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Project Area - Map Stalker</title>
                <meta name="description" content="map" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <MapStalker />
            </main>
        </>
    )
}
