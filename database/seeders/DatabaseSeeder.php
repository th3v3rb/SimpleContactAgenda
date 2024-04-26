<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'SA',
            'email' => 'test@test.com',
            'password' => Hash::make('helloworld')
        ]);

        //
        DB::table("person_types")->insert([
            'type' => 'Fisico',
        ]);



        // contact types
        DB::table('person_types')->insert([
            'type' => 'Juridico',
        ]);

        DB::table('contact_types')->insert([
            'type' => 'Celular'
        ]);

        DB::table('contact_types')->insert([
            'type' => 'Correo'
        ]);

        DB::table('contact_types')->insert([
            'type' => 'Linea baja'
        ]);

        DB::table('contact_types')->insert([
            'type' => 'Otro'
        ]);


        // document types
        DB::table('document_types')->insert([
            'type' => 'RUC'
        ]);

        DB::table('document_types')->insert([
            'type' => 'CI'
        ]);

        DB::table('document_types')->insert([
            'type' => 'docex'
        ]);
    }
}
