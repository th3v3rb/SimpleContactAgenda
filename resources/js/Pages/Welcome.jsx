import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <img src='/img/bg-landing.jpg' alt='' className="fixed inset-0 w-full h-full z-0 object-cover" />
            <div className=' min-h-screen text-gray-200 bg-gray-300/10 dark:bg-gray-950/80 backdrop-blur-lg z-10 ' >
                <div className="max-w-3xl m-auto">
                    <nav className='flex gap-4 w-full items-center p-4 justify-end'>
                        {!auth.user ?
                            <>
                                <Link href={route('register')} className="hover:bg-red-600 transition-colors rounded-sm p-2"> Registrarse</Link>
                                <Link href={route('login')} className="hover:bg-red-600 transition-colors rounded-sm p-2">Iniciar Sesion</Link>
                            </> :
                            <Link href={route('people.index')} className="hover:bg-red-600 border-2 border-red-600 transition-colors rounded-sm p-2" >Dashboard</Link>
                        }
                    </nav>


                    <main >
                        <h1 className='text-3xl flex gap-2 items-center'>
                            <ApplicationLogo alt="" className="rounded-full w-10 h-10" />
                            <span>Ideas Studios</span>
                        </h1>

                        <footer className="border-t-2 border-red-600 py-2 mt-4">
                           App designed by <span className="text-red-600"> Hugo Penayo </span> at 2024.
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}
