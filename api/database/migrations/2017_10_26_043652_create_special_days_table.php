<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSpecialDaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('special_days', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date')->nullable();
            $table->string('description')->nullable();
            $table->string('meta')->nullable();
            $table->integer('org_id')->nullable();
            $table->integer('grp_id')->nullable();
            $table->string('type')->nullable();     // holiday / working-day
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('special_days');
    }
}
