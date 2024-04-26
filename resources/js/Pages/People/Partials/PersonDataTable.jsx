import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function ContactDataTable({ contacts, personId, contactTypes }) {
   // update modal stuff
   const [showModal, setShowModal] = useState(false);

   const contact = useRef();
   const contactTypeId = useRef();
   const note = useRef();

   console.log(contacts);

   const { data, setData, errors, put, reset, processing, recentlySuccessful } =
      useForm({
         contact: '',
         contactTypeId: contactTypes[0].id,
         note: '',
         isMainContact: false,
         personId: personId,
         contactId: '',
      });

   const handleClickEditButton = (selectedContact) => {
      setShowModal(true);

      data.contact = selectedContact.contact;
      data.contactTypeId = selectedContact.contact_type_id;
      data.note = selectedContact.note ?? '';
      data.personId = selectedContact.person_id;
      data.isMainContact = selectedContact.is_main;
      data.contactId = selectedContact.id;
   };

   const updateContact = (e) => {
      e.preventDefault();

      put(route('contact.update', { id: data.contactId }), {
         preserveScroll: true,
         onSuccess: () => reset(),
      });

      setShowModal(false);
   };

   //  delete contact stuff
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [selectedContact, setSelectedContact] = useState(null);

   const handleShowDeleteModal = (contact) => {
      setShowDeleteModal(true);
      setSelectedContact(contact);
   };

   return (
      <div className='grow overflow-y-auto mt-10'>
         <h3>Medios registrados</h3>

         <table className='mt-2 min-w-full text-center text-sm font-light '>
            <thead className='border-b font-medium dark:border-neutral-500'>
               <tr>
                  <th scope='col' className='px-6 py-2'>
                     -
                  </th>
                  <th scope='col' className='px-6 py-2'>
                     Contacto
                  </th>
                  <th scope='col' className='px-6 py-2'>
                     Tipo
                  </th>
                  <th scope='col' className='px-6 py-2'>
                     Observaciones
                  </th>
                  <th scope='col' className='px-6 py-2'>
                     Acciones
                  </th>
               </tr>
            </thead>
            <tbody>
               {contacts.map((contact, key) => {
                  return (
                     <tr className='border-b dark:border-neutral-500' key={key}>
                        <td className='whitespace-nowrap px-6 py-2'>
                           {contact.is_main ? (
                              <span className='bg-green-600 rounded-full p-2'>
                                 Principal
                              </span>
                           ) : (
                              ''
                           )}
                        </td>
                        <td className='whitespace-nowrap px-6 py-2'>
                           {contact.contact}
                        </td>
                        <td className='whitespace-nowrap px-6 py-2'>
                           {contact.type}
                        </td>
                        <td className='whitespace-nowrap px-6 py-2'>
                           {contact.note ? (
                              <span className='bg-yellow-600 rounded p-2'>
                                 {contact.note}
                              </span>
                           ) : (
                              'Sin notas'
                           )}
                        </td>
                        <td className='whitespace-nowrap px-6 py-2 flex gap-2'>
                           <button
                              title='edit button'
                              type='button'
                              onClick={() => handleClickEditButton(contact)}
                              className='bg-yellow-500 rounded text-sm p-2 shadow-sm hover:scale-105 text-slate-900 transition-all'
                           >
                              <PencilSquareIcon className='h-4 w-4 text-white' />
                           </button>
                           <button
                              title='delete button'
                              type='button'
                              className='bg-red-600 rounded text-sm p-2 shadow-sm hover:scale-105 text-slate-900 transition-all'
                              onClick={() => handleShowDeleteModal(contact)}
                           >
                              <XCircleIcon className='h-4 w-4 text-white' />
                           </button>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>

         <Modal onClose={() => setShowModal(false)} show={showModal}>
            <form
               className='p-6 text-gray-950 dark:text-gray-200 '
               onSubmit={updateContact}
            >
               <header className='flex items-center justify-between'>
                  <h3>Editar contacto</h3>
                  <XCircleIcon
                     className='w-5 h-5  transition-all cursor-pointer text-red-600'
                     onClick={() => setShowModal(false)}
                  />
               </header>
               <div className='mt-2'>
                  <div>
                     <InputLabel className='sr-only' value='Contacto' />
                     <TextInput
                        type='text'
                        value={data.contact}
                        ref={contact}
                        onChange={(e) => setData('contact', e.target.value)}
                        placeholder='098499XXXX'
                        className='w-full'
                     />
                     <InputError message={errors.contact} className='mt-2' />
                  </div>
                  <div className='mt-2'>
                     <InputLabel
                        htmlFor='contactTypeId'
                        className='sr-only'
                        value='Tipo de contacto'
                     />
                     <select
                        id='contactTypeId'
                        value={data.contactTypeId}
                        ref={contactTypeId}
                        onChange={(e) =>
                           setData('contactTypeId', e.target.value)
                        }
                        className='block w-full  bg-gray-900 border-gray-700 rounded-md w-100 focus:ring-red-500 focus:border-red-500'
                     >
                        {contactTypes.map((contactType, key) => {
                           return (
                              <option value={contactType.id} key={key}>
                                 {contactType.type}
                              </option>
                           );
                        })}
                     </select>
                  </div>
                  <div className='mt-2'>
                     <InputLabel
                        htmlFor='note'
                        className='sr-only'
                        value='Observaciones'
                     />
                     <TextInput
                        type='text'
                        id='note'
                        value={data.note}
                        ref={note}
                        onChange={(e) => setData('note', e.target.value)}
                        placeholder='Solo llamadas de 9 a 12...'
                        className='w-full'
                     />
                     <InputError message={errors.note} className='mt-2' />
                  </div>

                  <div className='flex gap-2 items-center mt-2'>
                     <InputLabel htmlFor='isMainContact' value='Principal' />
                     <Checkbox
                        id='isMainContact'
                        value={data.isMainContact}
                        checked={data.isMainContact}
                        onChange={(e) =>
                           setData('isMainContact', e.target.checked)
                        }
                     />
                  </div>

                  <div className='flex items-center gap-4 mt-2'>
                     <PrimaryButton className='mt-1' disabled={processing}>
                        Guardar
                     </PrimaryButton>
                     <Transition
                        show={recentlySuccessful}
                        enter='transition ease-in-out'
                        enterFrom='opacity-0'
                        leave='transition ease-in-out'
                        leaveTo='opacity-0'
                     >
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                           Guardado.
                        </p>
                     </Transition>
                  </div>
               </div>
            </form>
         </Modal>

         {/* delete modal */}
         <Modal
            onClose={() => setShowDeleteModal(false)}
            show={showDeleteModal}
         >
            <div className='p-2 text-gray-900 dark:text-gray-200'>
               <h3 className='py-2 text-xl  text-center text-wrap'>
                  <span className='text-red-500'>Advertencia</span>, esta accion
                  puede ocasionar perdida de datos
               </h3>

               <p className='my-2 text-2xl text-center text-wrap'>
                  Realmente quieres eliminar este registro?
               </p>

               {selectedContact && (
                  <Link
                     preserveState={false}
                     href={route('contact.destroy', {
                        id: selectedContact?.id,
                     })}
                     as='button'
                     method='delete'
                     className='w-full text-center transition-all p-2 block rounded-md mt-2 bg-gray-800 dark:bg-gray-100 dark:text-gray-600 font-bold hover:bg-opacity-85'
                  >
                     Continuar
                  </Link>
               )}
            </div>
         </Modal>
      </div>
   );
}
