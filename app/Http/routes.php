<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    Route::auth();
    Route::get('/', 'HomeController@index');
    Route::get('/game', 'GameController@index');
    Route::get('/buyItem/{id?}', 'UserController@buyItem');
    Route::get('/items/{id}', 'UserController@showItems');;
    Route::get('/statistic/{page?}', 'StatisticController@index');

    Route::resource('/profile', 'UserController');
    Route::resource('/news', 'ArticlesController');
    Route::resource('/shop', 'ItemController');
    Route::resource('/statistic', 'StatisticController');

    Route::post('/send', 'SocketController@sendMessage');
    Route::get('/write', 'SocketController@writeMessage');
    Route::get('/message', 'SocketController@index');

});

Route::group(['middleware' => ['web']], function () {
    Route::auth();
    Route::get('/admin', 'AdminController@index');
    Route::resource('/admin/news', 'ArticlesController');
    Route::resource('/admin/shop', 'ItemController');
});

Route::group(['namespace' => 'Api', 'prefix' => 'api'], function () {
    Route::resource('/play', 'GameController', ['except' => ['create','edit']]);
});
