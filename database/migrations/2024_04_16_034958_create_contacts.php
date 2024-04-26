<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
   /**
    * Run the migrations.
    */
   public function up(): void
   {
      Schema::create('contact_types', function (Blueprint $table) {
         $table->id();
         $table->string('type', 30)->unique();
         $table->timestamps();
      });

      Schema::create('contacts', function (Blueprint $table) {
         $table->id();
         $table->string('contact');
         $table->foreignId('contact_type_id')->constrained('contact_types');
         $table->foreignId('person_id')->constrained('people');
         $table->boolean('is_main')->default(false);
         $table->string('note', 255)->nullable(true);
         $table->boolean('is_active')->default(true)->nullable(false);
         $table->timestamps();
      });
   }

   /**
    * Reverse the migrations.
    */
   public function down(): void
   {
      Schema::dropIfExists('contacts');
      Schema::dropIfExists('contact_types');
   }
};
