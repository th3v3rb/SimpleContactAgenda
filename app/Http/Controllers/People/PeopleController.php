<?php

namespace App\Http\Controllers\People;


use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactType;
use App\Models\DocumentType;
use App\Models\Person;
use App\Models\PersonType;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

class PeopleController extends Controller
{
   public function index(Request $request): Response
   {
      $query = Person::query();

      if ($request->has('search')) {
         $query->where('social_reason', 'like', '%' . $request->input('search') . '%');
      }
      $query->leftJoin('contacts', function ($join) {
         $join->on('contacts.person_id', '=', 'people.id')
            ->where(function ($query) {
               $query->where('contacts.is_active', true)
                  ->where('contacts.is_main', true)
                  ->orWhereNull('contacts.person_id');
            });
      })
         ->where('people.is_active', true)
         ->selectRaw('COALESCE(contacts.contact, null) AS contact, people.*')
         ->orderBy('created_at', 'desc');

      // dd($query->toSql());

      $people = $query->paginate(10);

      return Inertia::render("People/Index", ['people' => $people]);
   }


   public function create(): Response
   {
      $contactTypes = ContactType::all();
      $personTypes = PersonType::all();
      $documentTypes = DocumentType::all();

      return Inertia::render('People/AddPerson', [
         'contactTypes' => $contactTypes,
         'personTypes' => $personTypes,
         'documentTypes' => $documentTypes
      ]);
   }

   public function store(Request $request): RedirectResponse
   {
      $validated = $request->validate([
         'socialReason' => 'required|max:255',
         'document' => 'required|max:20',
         'documentTypeId' => 'required|max:10',
         'personTypeId' => 'required|max:10',
         'birthday' => 'nullable|date',
         'city' => 'required|max:60',
         'contactTypeId' => 'required',
         'contact' => 'required',
         'address' => 'nullable'
      ]);

      $person = Person::create([
         'social_reason' => $validated['socialReason'],
         'document' => $validated['document'],
         'document_type_id' => $validated['documentTypeId'],
         'person_type_id' => $validated['personTypeId'],
         'birthday' => $validated['birthday'],
         'city' => $validated['city'],
         'address' => $validated['address']
      ]);

      Contact::create([
         'contact_type_id' => $validated['contactTypeId'],
         'contact' => $validated['contact'],
         'person_id' => $person['id'],
         'is_main' => true
      ]);

      return Redirect::route('people.create');
   }



   public function show($id)
   {
      $person = Person::query()
         ->leftJoin('person_types', 'person_types.id', '=', 'people.person_type_id')
         ->select(
            'people.*',
            'person_types.type as person_type'
         )
         ->where('people.id', '=', $id)
         ->first();


      if (!$person)
         return abort(404);

      $contacts = Contact::query()
         ->where('person_id', $id)
         ->where('is_active', true)
         ->join('contact_types', function ($join) {
            $join->on('contact_types.id', '=', 'contacts.contact_type_id');
         })
         ->select('contacts.*', 'contact_types.type')
         ->orderBy('created_at', 'desc')
         ->limit(100)
         ->get();


      // dd($contacts);

      $contactTypes = ContactType::all();

      return Inertia::render('People/ShowPerson', [
         'person' => $person,
         'contactTypes' => $contactTypes,
         'contacts' => $contacts
      ]);
   }


   public function destroy($id): RedirectResponse
   {
      Person::where('id', $id)->update([
         'is_active' => false
      ]);

      return Redirect::route('people.index');
   }

}
