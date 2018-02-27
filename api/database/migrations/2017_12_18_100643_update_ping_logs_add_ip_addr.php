<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdatePingLogsAddIpAddr extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ping_logs', function (Blueprint $table) {
            $table->string('ip_addr')->after('to_state')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ping_logs', function (Blueprint $table) {
            $table->dropColumn('ip_addr');
        });
    }
}
