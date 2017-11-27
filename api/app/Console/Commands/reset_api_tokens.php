<?php

namespace App\Console\Commands;

use App\Http\Controllers\UserController;
use Illuminate\Console\Command;

class reset_api_tokens extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reset:api_tokens {user*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Reset all users' api tokens";

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $users = $this->argument('user');
        if(count($users) == 1 && $users[0] == 0)
            $users = [];
        if($this->confirm('Are you sure you want to continue?')) {
            (new UserController)->resetApiTokens($users);
        }
        $this->info("API tokens reset.");
    }
}
