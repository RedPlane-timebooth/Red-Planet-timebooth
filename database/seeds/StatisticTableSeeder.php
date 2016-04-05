<?php

use Illuminate\Database\Seeder;

class StatisticTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Eloquent::unguard();
//        \DB::table('statistics')->delete();
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 50; $i +=1) {
            DB::table('statistics')->insert([
                'user_id' => $i+1,
                'total_score' => $faker->numberBetween($min = 1, $max = 100),
                'total_games' => $faker->numberBetween($min = 1, $max = 100),
                'win_games' => $faker->numberBetween($min = 1, $max = 100),
                'lose_games' => $faker->numberBetween($min = 1, $max = 100),
            ]);
        }
    }
}
