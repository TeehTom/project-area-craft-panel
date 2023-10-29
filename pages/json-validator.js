import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Validatorjson from '@/views/Validatorjson'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Project Area - Valider json</title>
                <meta name="description" content="objects" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className='wrapper'>
                    <span className='title'>JSON VALIDATOR 4000</span>
                    <Validatorjson />
                </div>
            </main>
        </>
    )
}


