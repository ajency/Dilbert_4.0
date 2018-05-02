<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersUserDetailsAddWorkFromHome extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // users
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('work_from_home')->default(false);
        });

        // user details
        Schema::table('locked__datas', function (Blueprint $table) {
            $table->boolean('work_from_home')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // users
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('work_from_home');
        });

        // user details
        Schema::table('locked__datas', function (Blueprint $table) {
            $table->dropColumn('work_from_home');
        });
    }
}
