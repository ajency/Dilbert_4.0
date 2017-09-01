<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('avatar');
            $table->string('lang');// language, user wants the app & site to be displayed as
            $table->string('timeZone'); // user choses the time zone which is defined in company list -> also determines the region where user works
            $table->date('acd');//account creation date
            $table->unsignedInteger('org_id')->nullable();
            $table->string('socket_id')->nullable();
            $table->string('role')->nullable();
            $table->string('api_token', 60) ->nullable(); // for authenticating request from chrome app
            $table->unsignedInteger('gen_id')->nullable();// This ID will be used as reference for API's
            $table->string('app_version')->nullable(); // Stores the current app version, the user is using.
            $table->string('browser_version')->nullable(); // Stores the current chrome browser version, the user is using.
            $table->string('gender')->nullable(); // Stores the gender of the user
            $table->date('dob');//user Date-Of-Birth
            $table->boolean('is_active')->default(true); // Stores if the user is active or inactive(removed/left the Org)

            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
