<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateLockedDatasAddChangesAndViolationsCount extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('locked__datas', function (Blueprint $table) {
            $table->integer('changes_count')->default(0);
            $table->integer('violations_count')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('locked__datas', function (Blueprint $table) {
            $table->dropColumn('changes_count');
            $table->dropColumn('violations_count');
        });
    }
}
