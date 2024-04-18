import Head from 'next/head';

const Home: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Next.js TypeScript Boilerplate</title>
                <meta name="description" content="Your description here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Welcome to Next.js with TypeScript</h1>
                <p>Edit <code>pages/index.tsx</code> and save to reload.</p>
            </main>

        </div>
    );
};

export default Home;
