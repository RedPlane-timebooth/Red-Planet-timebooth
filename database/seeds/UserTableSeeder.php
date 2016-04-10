<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Eloquent::unguard();
//        \DB::table('users')->delete();
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 43; $i +=1) {
            DB::table('users')->insert ([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => bcrypt('secret'),
            ]);
        }
    }
}
