import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import FoodRecipe from '@/views/FoodRecipe'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>Project Area - Lister objets</title>
                <meta name="description" content="objects" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className='wrapper'>
                    <span className='title'>FOOD RECIPE 666</span>
                    <FoodRecipe/>
                </div>
            </main>
        </>
    )
}
