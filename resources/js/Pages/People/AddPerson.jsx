import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Head, Link, useForm } from "@inertiajs/react";
import { useRef } from "react";


export default function AddPerson({ auth, contactTypes, personTypes, documentTypes }) {

    const socialReason = useRef();
    const document = useRef();
    const city = useRef();
    const documentTypeId = useRef();
    const contactTypeId = useRef();
    const personTypeId = useRef();
    const contact = useRef();
    const birthday = useRef();
    const address = useRef();

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        socialReason: '',
        document: '',
        city: '',
        personTypeId: personTypes[0].id,
        contactTypeId: contactTypes[0].id,
        documentTypeId: documentTypes[0].id,
        birthday: '',
        contact: '',
        address: '',
    })

    const addPerson = (e) => {
        e.preventDefault();

        post(route('people.store'), {
            preserveScroll: true,
        })
    }

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex gap-2 justify-start items-center flex-wrap">
                    <Link className="bg-slate-600 shadow-sm rounded hover:scale-105 hover:bg-slate-700 transition-all" href={route('people.index')}><ArrowLeftIcon className="w-8 h-8 text-gray-200 p-2" /></Link>
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Registrar Persona</h2>
                </div>
            }>
            <Head title='Personas' />


            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Los contactos de clientes se registran desde este apartado.</h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Registrar nuevo contacto.</p>
                            </header>

                            <form onSubmit={addPerson} className="mt-6 space-y-6" autoComplete="off">

                                {/* social reason */}
                                <div>
                                    <InputLabel htmlFor="socialReason" value="Razon Social" />

                                    <TextInput
                                        id="socialReason"
                                        ref={socialReason}
                                        placeholder="Hugo Penayo"
                                        value={data.socialReason}
                                        onChange={(e) => setData('socialReason', e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />

                                    <InputError message={errors.socialReason} className="mt-2" />
                                </div>


                                {/* document */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <div className="flex flex-col flex-grow">
                                        <InputLabel htmlFor="document" value="Documento" />

                                        <TextInput
                                            id="document"
                                            ref={document}
                                            placeholder="123213-0"
                                            value={data.document}
                                            onChange={(e) => setData('document', e.target.value)}
                                            type="text"
                                            className="mt-1 block w-full"
                                        />

                                        <InputError message={errors.document} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="documentTypeId" value="Tipo" />

                                        <select
                                            id="documentTypeId"
                                            ref={documentTypeId}
                                            value={data.documentTypeId}
                                            onChange={(e) => setData('documentTypeId', e.target.value)}
                                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-red-500 dark:focus:border-red-600 focus:ring-red-500 dark:focus:ring-red-600 rounded-md shadow-sm ">
                                            {
                                                documentTypes.map((documentType, key) => {
                                                    return <option value={documentType.id} key={key}>{documentType.type}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                {/* birthday */}
                                <div>
                                    <InputLabel htmlFor="birthday" value="Nacimiento (Opcional) " />

                                    <TextInput
                                        id="birthday"
                                        ref={birthday}
                                        value={data.birthday}
                                        onChange={(e) => setData('birthday', e.target.value)}
                                        type="date"
                                        className="mt-1 block w-full"
                                    />

                                    <InputError message={errors.birthday} className="mt-2" />
                                </div>

                                {/* city */}
                                <div>
                                    <InputLabel htmlFor="city" value="Ciudad" />

                                    <TextInput
                                        id="city"
                                        ref={city}
                                        placeholder="Caaguazu"
                                        onChange={(e) => setData('city', e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />

                                    <InputError message={errors.city} className="mt-2" />
                                </div>

                                {/* address */}
                                <div>
                                    <InputLabel htmlFor="address" value="Direccion" />

                                    <textarea
                                        id="address"
                                        ref={address}
                                        placeholder="15 de agosto c/ cerro cora"
                                        onChange={(e) => setData('address', e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full bg-gray-200 dark:bg-gray-900 focus:border-red-600 focus:ring-red-600 focus:ring-2 rounded-md"
                                    />

                                    <InputError message={errors.address} className="mt-2" />
                                </div>

                                {/* contact  */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    <div className="flex flex-col flex-grow">
                                        <InputLabel htmlFor="contact" value="Contacto Principal" />

                                        <TextInput
                                            id="contact"
                                            ref={contact}
                                            placeholder='0984996XXX'
                                            onChange={(e) => setData('contact', e.target.value)}
                                            type="text"
                                            className="mt-1 block flex-grow"
                                        />

                                        <InputError message={errors.contact} className="mt-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="contactTypeId" value="Tipo" />

                                        <select
                                            id="contactTypeId"
                                            name="contactTyeId"
                                            ref={contactTypeId}
                                            onChange={(e) => setData('contactTypeId', e.target.value)}
                                            className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-red-500 dark:focus:border-red-600 focus:ring-red-500 dark:focus:ring-red-600 rounded-md shadow-sm ">
                                            {
                                                contactTypes.map((contactType, key) => {
                                                    return <option value={contactType.id} key={key}>{contactType.type}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                {/* person type */}
                                <div>
                                    <InputLabel htmlFor="personTypeId" value="Tipo de persona" />

                                    <select
                                        id="personTypeId"
                                        name="personTypeId"
                                        ref={personTypeId}
                                        onChange={(e) => setData('personTypeId', e.target.value)}
                                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-red-500 dark:focus:border-red-600 focus:ring-red-500 dark:focus:ring-red-600 rounded-md shadow-sm ">
                                        {
                                            personTypes.map((personType, key) => {
                                                return <option value={personType.id} key={key}>{personType.type}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Confirmar</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Guardado.</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
