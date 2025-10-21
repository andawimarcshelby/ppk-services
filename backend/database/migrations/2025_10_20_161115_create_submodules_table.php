<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submodules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id')
                  ->constrained('modules')
                  ->cascadeOnDelete();
            $table->string('name');            // e.g., "Users"
            $table->string('code')->unique();  // e.g., "USERS"
            $table->string('route')->nullable(); // optional frontend route
            $table->timestamps();

            $table->index(['module_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submodules');
    }
};
