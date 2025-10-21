<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('system_id')
                  ->constrained('systems')
                  ->cascadeOnDelete();
            $table->string('name');            // e.g., "User Management"
            $table->string('code')->unique();  // e.g., "USER_MGMT"
            $table->string('icon')->nullable();
            $table->timestamps();

            $table->index(['system_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('modules');
    }
};
