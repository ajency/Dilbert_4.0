<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

use Symfony\Component\Console\Output\ConsoleOutput;

class ModelHasRoles extends Model
{
    protected $table = 'model_has_roles';
    public $timestamps = false;
}
