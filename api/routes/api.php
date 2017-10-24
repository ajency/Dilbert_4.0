<?php

use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// initial login validation
Route::get('/login/{provider}/{locale?}','Ajency\User\SocialAuthController@apiSocialAuth');
// Route::post('/addUSer','LoginController@addUSer');
// Route::post('/addOrg','LoginController@addOrg');

// dashboard api
Route::post('/period-data/{locale?}','LockedDataController@periodData')->middleware('check-permissions');    // month or week data
Route::post('/period-data/edit/{userCode}/{locale?}','LockedDataController@editPeriodData')->middleware('check-permissions');      // edit a user's locked data
Route::post('/day-summary/{locale?}','LogsController@daySummary')->middleware('check-permissions');    // detailed data for a particular day

// log histories api
Route::post('/log-history/{locale?}','DataChangesController@viewLockedDataChanges')->middleware('check-permissions');

// organisation api
Route::post('/join-organisation/{locale?}','OrganisationController@joinOrAddOrganisation');   // for first time login

// users api
Route::post('/users/{locale?}','UserController@displayUsers');
Route::post('/users/edit/{userCode}/{locale?}','UserController@editUserDetails');

// role management
Route::post('/role/{locale?}','RoleController@changeOrAddRole');

// cron jobs
Route::group(['prefix' => 'cron'], function() {
    // daily cron for leave marking and daily violation
    Route::post('/daily','CronController@daily');
    // weekly cron for total_hours_per_week violation
    Route::post('/weekly','CronController@weekly');
    // monthly cron for total_hours_per_month violation
    Route::post('/monthly','CronController@monthly');
});

// Desktop App
Route::get('/ping','AppController@periodicalPing');
Route::get('/state-update','CronController@stateUpdate');  // cron runs every 5 minutes

/**
 * Chrome App - EventChrome
 */
 Route::get('fire', function (Request $request) {
     // this fires the event
     $output = new ConsoleOutput();

     $output->writeln("At fire");

     if(\Request::exists('data_from') && \Request::only('data_from') !== "") { /* request has come from Chrome App */
         $output->writeln("requested from chrome");

         if($request->header( 'X-API-KEY' ) !== "" && $request->to_state === "New Session") {
             $output->writeln("Login Redis");
             $redis_list = $request;

             $redis_list->ip = request()->ip(); /* Get IP address using Request */
             event(new App\Events\EventChrome($redis_list));
         } else if ($request->to_state === "offline") {
             $output->writeln("Logout Redis");

             $redis_list = $request;
             $redis_list->ip = request()->ip(); /* Get IP address using request */
             event(new App\Events\EventChrome($redis_list));
         }

     } else { /* Request has come from nodeJS */
         $output->writeln("requested from nodeJS");

         if(\Request::header( 'X-API-KEY' ) !== "") { // if api key is present in Header
             $output->writeln("Header Present");
             $output->writeln(\Request::header( 'X-API-KEY' ));

             $redis_list = json_decode(Redis::lindex('test-channels', 0), false);// take 1st element
             //$output->writeln("REDIS data to JSON:");
             if($redis_list) {
                 //$output->writeln("REDIS data to JSON:" . $redis_list->user_id);
                 $request_user_id = $redis_list->user_id;
                 $user = User::where(['id' => $request_user_id, 'api_token' => \Request::header( 'X-API-KEY' )])->get();
                 //$user = User::where(['gen_id' => $request_user_id, 'api_token' => \Request::header( 'X-API-KEY' )])->get();
                 $output->writeln("User ID:".$request_user_id);

                 if(count($user) > 0) { // if the user exist
                     $output->writeln("APi key Present");

                     $redis_keys = Redis::keys('*');

                     $output->writeln("Length");
                     $queue_list_len = Redis::llen('test-channels');// get length of queue list
                     $output->writeln($queue_list_len);

                     if (isset($redis_list->socket_id)) { // check if the 1st content contains Socket_id
                         $output->writeln("Present");
                     } else {
                         $output->writeln("not Present");
                     }

                     event(new App\Events\EventChrome($redis_list));
                 } else if($request_user_id == 0) { // If user_id = 0, then the user related to that socket_id has gone offline
                     $output->writeln("APi key not present");

                     $request_user_socket = $redis_list->socket_id;

                     $output->writeln("User socket ID:".$request_user_socket);

                     $user = User::where('socket_id', $request_user_socket)->get();
                     //$output->writeln("Getting count");
                     $output->writeln(count($user));
                     if(count($user)) {
                         $output->writeln("User ID before save:".$user[0]->id);

                         $redis_keys = Redis::keys('*');

                         $output->writeln("Length");
                         $queue_list_len = Redis::llen('test-channels');// get length of queue list
                         $output->writeln($queue_list_len);

                         $output->writeln("Redis List");

                         if (isset($redis_list->socket_id)) { // check if the 1st content contains Socket_id
                             $output->writeln("Present");
                         } else {
                             $output->writeln("not Present");
                         }

                         event(new App\Events\EventChrome($redis_list));
                     } else { /* No such socket-ID exist */
                         Redis::lpop('test-channels');// remove the current-log element from queue
                     }
                 } else { // Invalid authentication
                     $redis_list = array("auth" => 0, "socket_id" => $redis_list->socket_id); // auth is set to 0 to define that user + APi key combination doesn't exist
                     event(new App\Events\EventChrome(json_decode(json_encode($redis_list), false)));
                 }
             } else {
                 $output->writeln("no content");
             }
         } else { // API token authentication is not used for offline function
             $redis_list = json_decode(Redis::lindex('test-channels', 0), false);// take 1st element

             if($redis_list->to_state == "offline") {
                 event(new App\Events\EventChrome($redis_list));
             } else {
                 Redis::lpop('test-channels');// remove the current-log element from queue
                 $output->writeln("No API auth");
             }
         }
     }
 });
