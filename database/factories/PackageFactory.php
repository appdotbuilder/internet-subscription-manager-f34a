<?php

namespace Database\Factories;

use App\Models\Package;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Package>
 */
class PackageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Package>
     */
    protected $model = Package::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $speeds = ['10 Mbps', '25 Mbps', '50 Mbps', '100 Mbps', '200 Mbps', '500 Mbps', '1 Gbps'];
        $speed = $this->faker->randomElement($speeds);
        
        $basePrice = match($speed) {
            '10 Mbps' => 299,
            '25 Mbps' => 499,
            '50 Mbps' => 799,
            '100 Mbps' => 1299,
            '200 Mbps' => 1999,
            '500 Mbps' => 2999,
            '1 Gbps' => 4999,
            default => 999,
        };

        return [
            'name' => $this->faker->company() . ' ' . $speed . ' Plan',
            'speed' => $speed,
            'price' => $basePrice + random_int(-100, 200),
            'active_duration' => 30,
        ];
    }
}