<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

//week1//
Route::get('/test', function () { return Inertia::render('Test'); })->name('test');
Route::get('/tictactoe', function () { return Inertia::render('TicTacToe'); })->name('tictactoe');
Route::get('/fruit', function () { return Inertia::render('Fruit'); })->name('fruit');
//week2//
Route::get('/hello-teacher', function () { return Inertia::render('HelloTeacher'); })->name('hello-teacher');
Route::get('/about-page', function (){ return Inertia::render('AboutPage'); })->name('about-page');
Route::get('/home-page', function (){ return Inertia::render('HomePage'); })->name('home-page');
//WorkshopWeek2//
Route::get("/bootstrap", function () { return Inertia::render('Bootstrap'); })->name('bootstrap');
//Week3//
Route::get('/circle', function () { return Inertia::render('Circle');})->name('circle');
Route::get('/counter', function() { return Inertia::render('Counter');})->name('counter');
Route::get('/form-example', function() { return Inertia::render('FormExample');})->name('form-example');
Route::get('/list-manager', function() { return Inertia::render('ListManager'); })->name('list-manager');
Route::get('/infinite-scroll', function() { return Inertia::render('InfiniteScroll'); })->name('infinite-scroll');
Route::get('/cinema', function() { return Inertia::render('Cinema'); })->name('cinema');
Route::get('/food-order', function() { return Inertia::render('FoodOrder'); })->name('food-order');
