<?php

use Illuminate\Database\Seeder;

class ArticleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Eloquent::unguard();
        \DB::table('articles')->delete();
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 50; $i +=1) {
            DB::table('articles')->insert([
                'title' => $faker->text($maxNbChars = 10),
                'short' => $faker->text($maxNbChars = 50),
                'body' => $faker->text($maxNbChars = 2000),
                'image' => $faker->imageUrl($width = 640, $height = 480)
            ]);
        }
    }
}
