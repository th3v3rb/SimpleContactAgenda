<?php

namespace App\Http\Controllers\People;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactType;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class ContactsController extends Controller
{

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'contact' => 'required|max:120',
            'contactTypeId' => 'required',
            'note' => 'nullable|max:50',
            'isMainContact' => 'boolean',
            'personId' => 'required'
        ]);

        if ($validated['isMainContact']) {
            Contact::where('person_id', $validated['personId'])
                ->update(['is_main' => false]);
        }

        Contact::create([
            'person_id' => $validated['personId'],
            'contact' => $validated['contact'],
            'contact_type_id' => $validated['contactTypeId'],
            'note' => $validated['note'],
            'is_main' => $validated['isMainContact'],
            'is_active' => true
        ]);

        return back();
    }

    public function update(Request $request, $id): RedirectResponse
    {

        $validated = $request->validate([
            'contact' => 'required|max:120',
            'contactTypeId' => 'required',
            'note' => 'nullable|max:50',
            'isMainContact' => 'boolean',
            'personId' => 'required',
        ]);



        if ($validated['isMainContact']) {
            Contact::where('person_id', $validated['personId'])
                ->update(['is_main' => false]);
        }

        $mainCount = Contact::where('is_main', true)
            ->where('person_id', $validated['personId'])
            ->count('is_main');


        if ($mainCount == 0)
            $validated['isMainContact'] = true;


        Contact::query()
            ->where('person_id', '=', $validated['personId'])
            ->where('id', '=', $id)
            ->update([
                'contact' => $validated['contact'],
                'contact_type_id' => $validated['contactTypeId'],
                'note' => $validated['note'],
                'is_main' => $validated['isMainContact']
            ]);

        return back();
    }


    public function destroy($id) : RedirectResponse {
        Contact::where('id', $id)->update([
            'is_active' => false
        ]);

        return back();
    }
}
