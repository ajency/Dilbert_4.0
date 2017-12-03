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

// all users summary
Route::post('summary/{org_id}/{locale?}','LockedDataController@allUsersSummary');

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

// slots api
Route::post('/edit-slots',function() {
    return response()->json([
        "status" => 200,
        "message" => "Success",
        "data" => [
            "slots" => [
                [
                    "type" => "lunch",
                    "date" => "2017-11-28",
                    "start_time" => "13:30",
                    "end_time" => "14:15",
                    "total_time" => "00:45"
                ]
            ],
            "period_meta" => [
                "period_unit" => "week",
                "worked_total" => "46:10",
                "worked_expected" => "45:00",
                "lunch_total" => "03:00",
                "lunch_expected" => "03:45"
            ]
        ]
    ]);
});
