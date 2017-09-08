<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrganisationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();// name of the organization
            $table->string('domain')->unique();
            $table->string('logo')->nullable();// url of the image/logo // or $table->binary('logo'); // blob of the logo
            $table->integer('idle_time');
            $table->string('default_lang');// all the members init lang will be set to this
            $table->string('default_tz')->nullable();// HQ time zone
            $table->text('alt_tz')->nullable();// will be an array of timezones [{loc:US,tz:-8:00},{loc:UK,tz:+0:00}}]
            $table->text('ip_lists')->nullable();// {'IP addr' => 'a.b.c.d', 'status' => 'static/dynamic'} -> i.e. constant IP or varying IP
            $table->text('ip_status')->nullable();
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
        Schema::dropIfExists('organizations');
    }
}
