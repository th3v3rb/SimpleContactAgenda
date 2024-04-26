<?php



use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard/basics', function() { return Inertia::render('Basic/Index');})->name('dashboard.basics');
});


require __DIR__ . '/basic/people.php';
require __DIR__ . '/basic/contacts.php';
