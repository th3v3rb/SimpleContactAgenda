import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react"
import { useRef } from "react"


export default function AddContactForm ({ person, contactTypes }) {

    const contact = useRef();
    const contactTypeId = useRef();
    const note = useRef();

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        contact: '',
        contactTypeId: contactTypes[0].id,
        note: '',
        isMainContact: false,
        personId: person.id
    })

    console.log('form data',data)

    const addContact = (e) => {
        e.preventDefault();

        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () =>{
               reset();
               contact.current.focus();
            },
            onError: (errors) => console.log(errors)
        })
    }


    return (
        <form onSubmit={addContact} className="grow">
            <h3>Registrar nuevo Medio</h3>
            <div className="mt-2">
                <div>
                    <InputLabel className="sr-only" value="Contacto" />
                    <TextInput
                        type='text'
                        isFocused={true}
                        value={data.contact}
                        ref={contact}
                        onChange={(e) => setData('contact', e.target.value)}
                        placeholder="098499XXXX"
                        className='w-full'
                    />
                    <InputError message={errors.contact} className="mt-2" />
                </div>
                <div className="mt-2">
                    <InputLabel htmlFor='contactTypeId' className="sr-only" value="Tipo de contacto" />
                    <select
                        id='contactTypeId'
                        value={data.contactTypeId}
                        ref={contactTypeId}
                        onChange={(e) => setData('contactTypeId', e.target.value)}
                        className="block w-full  bg-gray-900 border-gray-700 rounded-md w-100 focus:ring-red-500 focus:border-red-500"
                    >
                        {
                            contactTypes.map((contactType, key) => {
                                return <option value={contactType.id} key={key}>{contactType.type}</option>
                            })
                        }
                    </select>
                </div>
                <div className="mt-2">
                    <InputLabel htmlFor='note' className="sr-only" value="Observaciones" />
                    <TextInput
                        type='text'
                        id='note'
                        value={data.note}
                        ref={note}
                        onChange={(e) => setData('note', e.target.value)}
                        placeholder='Solo llamadas de 9 a 12...'
                        className='w-full'
                    />
                    <InputError message={errors.note} className="mt-2" />
                </div>
                <div className="flex gap-2 items-center mt-2">
                    <InputLabel htmlFor='isMainContact' value="Principal" />
                    <Checkbox
                        id='isMainContact'
                        value={data.isMainContact}
                        onChange={(e) => setData('isMainContact', e.target.checked)}
                    />
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <PrimaryButton className="mt-1" disabled={processing}>Guardar</PrimaryButton>
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
            </div>
        </form>
    )
}
