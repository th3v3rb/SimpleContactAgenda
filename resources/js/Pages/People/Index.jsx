import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ExclamationTriangleIcon, PlusIcon, MagnifyingGlassIcon, InformationCircleIcon, PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid'
import Modal from "@/Components/Modal";
import { useState } from "react";


export default function People({ auth, people }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    console.log('es',people)


    const searchPeople = (e) => {
        if (e.key === 'Enter') {
            router.get(route('people.index'), {
                search: e.target.value,
            }, {
                preserveScroll: true,
                preserveState: true
            })
        }
    }

    const openModal = (person) => {
        setShowModal(true);
        setSelectedPerson(person);
    }

    return (
        <Authenticated user={auth.user}
            header={<div className="flex justify-between items-center flex-wrap">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Operaciones diarias basicas</h2>
                <Link className="bg-red-600 shadow-sm rounded hover:scale-105 hover:bg-red-700 transition-all" href={route('people.create')}><PlusIcon className="w-10 h-10 text-gray-200 p-2" /></Link>
            </div>}
        >
            <Head title="People" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* search */}
                            <div className="flex w-100 text-gray-600 focus-within:text-red-600 gap-2 transition-all">
                                <MagnifyingGlassIcon className="w-10 h-10" />
                                <InputLabel htmlFor="search-input" className="sr-only">Buscar</InputLabel>
                                <TextInput id='search-input' name='search' className='w-full transition-all' maxLength={20} onKeyDown={searchPeople} />
                            </div>

                            {/* table content */}
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Razon social</th>
                                        <th scope="col" className="px-6 py-4">Documento</th>
                                        <th scope="col" className="px-6 py-4">Ciudad</th>
                                        <th scope="col" className="px-6 py-4">Contacto principal</th>
                                        <th scope="col" className="px-6 py-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        people.data.map((person, key) => {
                                            return (
                                                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-red-600" key={key}>
                                                    <td className="whitespace-nowrap px-6 py-4">{person.social_reason}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{person.document}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{person.city}</td>
                                                    <td className="whitespace-nowrap px-6 py-4">{person.contact ?? <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />}</td>
                                                    <td className="whitespace-nowrap px-6 py-4 flex gap-2 flex-wrap">
                                                        <Link href={route('people.show', { id: person.id })} className="bg-sky-500 rounded text-sm p-2 shadow-sm hover:scale-105 text-slate-900 transition-all"><InformationCircleIcon className="w-5 h-5 text-white" /></Link>
                                                        <button type="button" className="bg-yellow-500 rounded text-sm p-2 shadow-sm hover:scale-105 text-slate-900 transition-all"><PencilSquareIcon className="w-5 h-5 text-white" /></button>
                                                        <button type="button" onClick={() => openModal(person)}
                                                            className="bg-gray-600 rounded text-sm p-2 shadow-sm hover:scale-105 text-slate-900 transition-all" ><XCircleIcon className="w-5 h-5 text-white" /></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


                <Modal onClose={() => setShowModal(false)} show={showModal} >
                    <div className="p-2 text-gray-900 dark:text-gray-200">
                        <h3 className="py-2 text-xl  text-center text-wrap"><span className="text-red-500">Advertencia</span>, esta accion puede ocasionar perdida de datos</h3>

                        <p className="my-2 text-2xl text-center text-wrap">
                            Realmente quieres eliminar este registro?

                        </p>
                        {selectedPerson &&
                            <Link preserveState={false} method="delete" as="button" href={route('people.destroy', { id: selectedPerson?.id })}
                            className="w-full text-center transition-all p-2 block rounded-md mt-2 bg-gray-800 dark:bg-gray-100 dark:text-gray-600 font-bold hover:bg-opacity-85" >Continuar</Link>}
                    </div>
                </Modal>
        </Authenticated>
    )
}


