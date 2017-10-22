<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGroupIdToOrganisationMeta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('organisation_metas', function (Blueprint $table) {
            $table->integer('group_id')->default(0)->after('organisation_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('organisation_metas', function (Blueprint $table) {
            $table->dropColumn('group_id');
        });
    }
}
