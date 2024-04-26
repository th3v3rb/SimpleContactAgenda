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

        Schema::create('document_types', function (Blueprint $table) {
            $table->id();
            $table->string('type', 30)->unique();
            $table->timestamps();
        });

        Schema::create('person_types', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['Fisico', 'Juridico']);
            $table->timestamps();
        });

        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('social_reason', 240)->nullabe();
            $table->string('document', 20)->nullable(false);
            $table->string('city', 50)->nulable(false);
            $table->foreignId('document_type_id')->constrained('document_types');
            $table->foreignId('person_type_id')->constrained('person_types');
            $table->date('birthday')->nullable();
            $table->string('address', 255)->nullable(true);
            $table->boolean('is_active')->default(true)->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('people');
        Schema::dropIfExists('document_types');
        Schema::dropIfExists('person_types');
    }
};
