<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('students')->insert([
            [
                'student_code' => '6600001',
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john.doe@vru.ac.th',
                'major' => 'Computer Science',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_code' => '6600002',
                'first_name' => 'Jane',
                'last_name' => 'Smith',
                'email' => 'jane.smith@vru.ac.th',
                'major' => 'Information Technology',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_code' => '6600003',
                'first_name' => 'Michael',
                'last_name' => 'Jordan',
                'email' => 'michael.j@vru.ac.th',
                'major' => 'Software Engineering',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_code' => '6600004',
                'first_name' => 'Sarah',
                'last_name' => 'Connor',
                'email' => 'sarah.c@vru.ac.th',
                'major' => 'Computer Science',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'student_code' => '6600005',
                'first_name' => 'Alex',
                'last_name' => 'Mercer',
                'email' => 'alex.m@vru.ac.th',
                'major' => 'Information Technology',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}