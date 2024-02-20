import Link from 'next/link'


export default function Home() {
    return (
        <div>
            <h1>Payload Auth Example</h1>
            <p>
                {'This is a '}
                <Link href="/posts" target="" rel="noopener noreferrer">
                    Payload
                </Link>
            </p>
        </div>
    )
}
