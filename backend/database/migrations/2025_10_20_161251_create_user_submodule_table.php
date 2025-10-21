<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_submodule', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->foreignId('submodule_id')
                  ->constrained('submodules')
                  ->cascadeOnDelete();

            $table->timestamp('granted_at')->nullable();

            // Optional: who granted the permission
            $table->foreignId('created_by')
                  ->nullable()
                  ->constrained('users')
                  ->nullOnDelete();

            // Keep pairs unique
            $table->unique(['user_id', 'submodule_id']);

            // Helpful index
            $table->index(['submodule_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_submodule');
    }
};
