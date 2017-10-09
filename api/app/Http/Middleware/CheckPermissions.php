<?php

namespace App\Http\Middleware;

use Closure;

use App;
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
            'api/period-data/{locale?}' => ['view_period_data'],
            'api/period-data/edit/{userCode}/{locale?}' => ['edit_period_data'],
            'api/day-summary/{locale?}' => ['view_period_data'],
            'api/day-summary/edit/{locale?}' => ['edit_period_data'],
            'api/users/edit/{userCode}/{locale?}' => ['edit_user'],
            'api/log-history/{locale?}' => ['view_log_history']
        ];

        $uriPath = $request->route()->uri();

        // localisation (default english)
        if($request->route('locale') != null)
            App::setLocale($request->route('locale'));
        else
            App::setLocale('en');

        // check if a from is given or not
        if(empty($request->header('from')))
            return response()->json(['status' => 400, 'message' => __('api_messages.params_missing')]);
        // next check if the person is accessing his own data
        if($request->route('userCode') != null)
            $userId = $request->route('userCode');
        else
            $userId = $request->user_id;
        if($request->header('from') == $userId) {
            return $next($request);
        }
        else {
            // first check if the uri is or view log histories
            if($uriPath == 'api/log-history/{locale?}' && $request->input('user_id') != null && count($request->input('user_id')) == 1 && $request->header('from') == $request->input('user_id')[0]) {
                    return $next($request);
            }
            // check if the the calling user has the necessary permissions
            $user = User::find($request->header('from'));
            // $userPermissions = $user->getAllPermissions();
            $userPermissions = $user->getAllUSerPermissions();
            // foreach($user->getAllPermissions() as $uperm) {
            //     array_push($userPermissions,$uperm->name);
            // }
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
