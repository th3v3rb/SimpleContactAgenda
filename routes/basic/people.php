<?php
use App\Http\Controllers\People\PeopleController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth')->group(function () {
    Route::get('/dashboard/people', [PeopleController::class, 'index'])
        ->name('people.index');

    Route::get('/dashboard/people/add', [PeopleController::class, 'create'])
        ->name('people.create');

    Route::post('/dashboard/people/store', [PeopleController::class, 'store'])
        ->name('people.store');

    Route::get('/dashboard/people/show/{id}', [PeopleController::class, 'show'])
        ->name('people.show');

    Route::delete('/dashboard/people/destroy/{id}', [PeopleController::class, 'destroy'])
        ->name('people.destroy');
});
