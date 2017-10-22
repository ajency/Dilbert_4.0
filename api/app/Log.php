<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Symfony\Component\Console\Output\ConsoleOutput;

class Log extends Model
{
    /**
     * Finds the time difference in minutes
     * @param  string $start
     * @param  string $end
     * @return number of minutes
     */
    public function timeDifferenceInMins($start,$end) {
        // return the time difference in minutes - start and end are both strings
        $startTime = new \DateTime($start);
        $endTime = new \DateTime($end);
        $output = new ConsoleOutput;
        $d = date_diff($startTime,$endTime);
        $output->writeln($d->i);
        return $d->h*60 + $d->i;
    }
}
