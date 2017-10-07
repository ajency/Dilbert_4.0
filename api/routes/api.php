<?php

use Illuminate\Http\Request;

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
Route::post('/log-history/{locale?}','DataChangesController@viewLockedDataChanges')/*->middleware('check-permissions')*/;

// organisation api
Route::post('/join-organisation/{locale?}','OrganisationController@joinOrAddOrganisation');   // for first time login

// users api
Route::post('/users/{locale?}','UserController@displayUsers');
Route::post('/users/edit/{userCode}/{locale?}','UserController@editUserDetails');

// role management
Route::post('/role/{locale?}','RoleController@changeOrAddRole');
