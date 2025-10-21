<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add new columns for our spec
            $table->string('username')->unique()->after('id');
            $table->string('full_name')->nullable()->after('username');

            // Company relationship (nullable for flexibility during seeding)
            $table->foreignId('company_id')
                  ->nullable()
                  ->constrained('companies')
                  ->cascadeOnDelete();

            // Active flag
            $table->boolean('is_active')->default(true);

            // Note: We are not renaming/dropping default 'name' or changing 'email' nullability
            // to avoid requiring doctrine/dbal. We'll simply use full_name instead.
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('company_id');
            $table->dropColumn(['username', 'full_name', 'is_active']);
        });
    }
};
