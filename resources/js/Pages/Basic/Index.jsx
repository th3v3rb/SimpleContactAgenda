import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { CalendarIcon, CubeIcon, CurrencyDollarIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/solid'


export default function Index({ auth }) {
    return <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Operaciones diarias basicas</h2>}>
        <Head title="Daily" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-100">
                        <div className='flex gap-4 items-center justify-center flex-wrap'>

                            <button type='button' className="bg-red-600 rounded-lg shadow-md p-6 flex items-center grow  hover:scale-105 transition-all cursor-pointer ">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">Facturacion de compras</h3>
                                    <p className="text-sm ">
                                        <span>Registro y seguimiento de compras</span>
                                        <br />
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <CubeIcon className="w-8 h-8" />
                                </div>
                            </button>

                            <button type='button' className="bg-green-600 rounded-lg shadow-md p-6 flex items-center grow hover:scale-105 transition-all cursor-pointer">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">Facturacion de ventas</h3>
                                    <p className="text-sm ">
                                        <span>Pantalla de registro de ventas</span>
                                        <br />
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <CurrencyDollarIcon className="w-8 h-8" />
                                </div>
                            </button>

                            <button type='button' className="bg-gray-600 rounded-lg shadow-md p-6 flex items-center grow hover:scale-105 transition-all cursor-pointer">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">Registro de eventos</h3>
                                    <p className="text-sm ">
                                        <span>Calendario de eventos de la empresa</span>
                                        <br />
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <CalendarIcon className="w-8 h-8" />
                                </div>
                            </button>


                            <Link
                            href={route('people.index')} className="bg-gray-600 rounded-lg shadow-md p-6 flex items-center grow hover:scale-105 transition-all cursor-pointer">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold">Libreta de contactos</h3>
                                    <p className="text-sm ">
                                        <span>Registro de personas y contactos del sistema</span>
                                        <br />
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <GlobeEuropeAfricaIcon className="w-8 h-8" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
}
