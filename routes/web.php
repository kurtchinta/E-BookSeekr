<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

Route::get('/books/search', [BookController::class, 'search']);
Route::post('/books/favorite', [BookController::class, 'favoriteBook']);
Route::get('/books/favorites', [BookController::class, 'getFavorites']);


Route::get('{any}', function () {
    return view('app'); // Replace 'app' with your Blade view that contains your Vue app
})->where('any', '.*');
