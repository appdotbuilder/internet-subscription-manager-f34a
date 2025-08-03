<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('speed')->comment('Internet speed (e.g., 10 Mbps, 100 Mbps)');
            $table->decimal('price', 10, 2)->comment('Package price');
            $table->integer('active_duration')->default(30)->comment('Duration in days');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};