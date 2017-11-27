<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_details', function (Blueprint $table) {
            $table->increments('id');
            $table->string('avatar', 150)->nullable();
            $table->string('lang', 10)->nullable();
            $table->string('timeZone', 50)->nullable();
            $table->date('joining_date')->nullable();
            $table->integer('org_id')->nullable();
            $table->string('socket_id', 100)->nullable();
            $table->string('api_token', 100)->nullable();
            $table->string('gender', 10)->nullable();
            $table->date('dob')->nullable();
            $table->string('app_version', 10)->nullable();
            $table->string('browser_version', 10)->nullable();
            $table->integer('user_id')->nullable();
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
        Schema::dropIfExists('user_details');
    }
}
