<?php

use Illuminate\Database\Seeder;

class ItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Eloquent::unguard();
//        \DB::table('items')->delete();
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 50; $i +=1) {
            DB::table('items')->insert([
                'name' => $faker->text($maxNbChars = 10),
                'description' => $faker->text($maxNbChars = 50),
                'price' => $faker->numberBetween($min = 1000, $max = 9000),
                'img_address' => $faker->imageUrl($width = 640, $height = 480)
            ]);
        }
    }
}
