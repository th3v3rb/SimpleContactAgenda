import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";
import AddContactForm from "./Partials/AddContactForm";
import PersonDataList from "./Partials/PersonDataList";
import ContactDataTable from "./Partials/PersonDataTable";

export default function ShowPerson({ auth, person, contacts, contactTypes }) {

   return (
      <Authenticated
         user={auth.user}
         header={
            <div className='flex justify-start gap-2 items-center flex-wrap'>
               <Link
                  className='bg-slate-600 shadow-sm rounded hover:scale-105 hover:bg-slate-700 transition-all'
                  href={route("people.index")}>
                  <ArrowLeftIcon className='w-8 h-8 text-gray-200 p-2' />
               </Link>
               <h2 className='font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight'>
                  Operaciones diarias basicas
               </h2>
            </div>
         }>
         <Head title='People' />
         <div className='py-12'>
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
               <div className='bg-white dark:bg-gray-800/50 overflow-hidden shadow-sm sm:rounded-lg'>
                  <div className='p-6 text-gray-900 dark:text-gray-100'>
                     <header>
                        <h3 className='text-lg font-semibold mb-2'>
                           Datos del contacto #{person.id}
                        </h3>
                     </header>

                     <div className='flex gap-10 flex-wrap'>
                        <PersonDataList person={person} />
                        <AddContactForm
                           person={person}
                           contactTypes={contactTypes}
                        />
                     </div>
                     <ContactDataTable
                        contacts={contacts}
                        personId={person.id}
                        contactTypes={contactTypes}
                     />
                  </div>
               </div>
            </div>
         </div>
      </Authenticated>
   );
}
