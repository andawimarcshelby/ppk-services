<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');                 // e.g., "PPK Farms"
            $table->string('code')->unique();       // e.g., "PPK-FARMS"
            $table->string('primary_color', 7);     // e.g., "#1E5128"
            $table->string('accent_color', 7)->nullable(); // e.g., "#D8E9A8"
            $table->string('logo_url')->nullable(); // optional logo
            $table->timestamps();

            $table->index('name'); // minor helper index for ordering/search
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
