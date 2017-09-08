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
Route::post('/login','Auth\LoginController@authenticateUser');
// Route::post('/addUSer','LoginController@addUSer');
// Route::post('/addOrg','LoginController@addOrg');

// dashboard api
Route::post('/periodData','LockedDataController@periodData');    // month or week data
Route::post('/daySummary','LogsController@daySummary');    // detailed data for a particular day

// organisation api
Route::post('/join-organisation','OrganisationController@joinOrAddOrganisation');   // for first time login
