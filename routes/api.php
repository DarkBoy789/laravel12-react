<?php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/product', function () {
    $products = Product::all(); // Fetch all products
    return response()->json($products); // Return as JSON
});

Route::get('/students', function () {
    return response()->json(DB::table('students')->get());
});