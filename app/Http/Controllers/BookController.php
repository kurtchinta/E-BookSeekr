<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Supabase\SupabaseClient;
use Illuminate\Support\Facades\Http;

class BookController extends Controller
{
    private $supabase;

    public function __construct()
    {
        $this->supabase = new SupabaseClient(
            env('SUPABASE_URL'),
            env('SUPABASE_ANON_KEY')
        );
    }

    public function search(Request $request)
    {
        $query = $request->query('q');
        $apiKey = env('GOOGLE_BOOKS_API_KEY');
        $response = Http::get("https://www.googleapis.com/books/v1/volumes", [
            'q' => $query,
            'key' => $apiKey,
            'maxResults' => 10,
        ]);

        return $response->json();
    }

    public function favoriteBook(Request $request)
    {
        $validated = $request->validate([
            'book_id' => 'required|string',
            'title' => 'required|string',
            'thumbnail' => 'nullable|string',
        ]);

        $response = $this->supabase
            ->from('favorite_books')
            ->insert([$validated])
            ->execute();

        return response()->json(['message' => 'Book favorited successfully', 'data' => $response['data']], 201);
    }

    public function getFavorites()
    {
        $response = $this->supabase
            ->from('favorite_books')
            ->select('*')
            ->execute();

        return response()->json($response['data']);
    }
}
