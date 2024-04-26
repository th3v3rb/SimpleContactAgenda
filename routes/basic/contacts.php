<?php
use App\Http\Controllers\People\ContactsController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth')->group(function () {


    Route::post('/contact/store', [ContactsController::class,'store'])
    ->name('contact.store');

                                // id its the contact id in this case
    Route::put('/contact/update/{id}', [ContactsController::class,'update'])
    ->name('contact.update');

                                // id its the contact id in this case
    Route::delete('/contact/destroy/{id}', [ContactsController::class, 'destroy'])
    ->name('contact.destroy');
});
