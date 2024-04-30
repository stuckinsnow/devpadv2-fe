import Link from 'next/link'
import './_css/globals.scss';
import SearchAndFilter from './_components/SearchAndFilter';



export default async function Home() {


    const bug = 'happy happy';

    try {

        return (
            <div>
                <h1>Blog example</h1>
                {bug}
                <p>
                    {'This is a '}
                    <Link href="/posts/" target="" rel="noopener noreferrer">
                        Posts
                    </Link>
                    {' Page'}
                </p>

            </div>
        )
    } catch (error) {
        console.error(error);
    }
}
