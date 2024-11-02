<?php
use Illuminate\Support\Facades\Route;

Route::get('{any}', function () {
    return view('app'); // Replace 'app' with your Blade view that contains your Vue app
})->where('any', '.*');
