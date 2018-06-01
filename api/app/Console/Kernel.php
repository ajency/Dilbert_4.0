<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // cron that runs every 5 minutes to check for offline state between 9:30 am and 9:30 pm ist
        $schedule->call('\App\Http\Controllers\CronController@stateUpdate')->everyFiveMinutes()->between("04:00","16:00");

        // daily cron for status update - everyday at 10:30 pm ist
        $schedule->call('\App\Http\Controllers\CronController@daily')->dailyAt("17:00");

        // weekly cron for total week hours violation - every sunday at 10:30 pm ist
        $schedule->call('\App\Http\Controllers\CronController@weekly')->sundays()->at('17:30');

        // // monthly cron for monthly total hours violation - last day of every month at 10:30 pm ist
        // $schedule->call('\App\Http\Controllers\CronController@monthly')->when(function () {
        //     return \Carbon\Carbon::now()->endOfMonth()->isToday();
        // })->at('17:00');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
