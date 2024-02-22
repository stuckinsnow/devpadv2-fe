import Link from 'next/link'


export default function Home() {


    const bug = 'happy happy';


    return (
        <div>
            <h1>Blog example</h1>
            {bug}
            <p>
                {'This is a '}
                <Link href="/posts" target="" rel="noopener noreferrer">
                    Posts
                </Link>
                {' Page'}
            </p>
        </div>
    )
}
