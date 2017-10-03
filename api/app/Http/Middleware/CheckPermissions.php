<?php

namespace App\Http\Middleware;

use Closure;

use App\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Symfony\Component\Console\Output\ConsoleOutput;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class CheckPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $output = new ConsoleOutput;
        // $output->writeln("lang:     ".$request->locale);
        // $output->writeln(json_encode($request));
        // define the permission for each uri if not self
        $uri = [
            'api/period-data/{locale?}' => ['view-period-data'],
            'api/period-data/edit/{locale?}' => ['edit-period-data'],
            'api/day-summary/{locale?}' => ['view-period-data'],
            'api/day-summary/edit/{locale?}' => ['edit-period-data'],
            'api/users/edit/{userCode}/{locale?}' => ['edit-user']
        ];

        // check if a from is given or not
        if(empty($request->header('from')))
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        // next check if the person is accessing his own data
        if($request->header('from') == $request->user_id) {
            return $next($request);
        }
        else {
            // check if the the calling user has the necessary permissions
            $uriPath = $request->route()->uri();
            $user = User::find($request->header('from'));
            // $userPermissions = $user->getAllPermissions();
            $userPermissions = [];
            foreach($user->getAllPermissions() as $uperm) {
                array_push($userPermissions,$uperm->name);
            }
            $uriPermissions = $uri[$uriPath];
            // $output->writeln(array_intersect($userPermissions,$uriPermissions));
            if(count(array_intersect($userPermissions,$uriPermissions)) == 0) {
                // abort(403);
                return response()->json(["status" => 400, "message" => __('api_messages.authorisation')]);
            }
            else
                return $next($request);
        }
    }
}
