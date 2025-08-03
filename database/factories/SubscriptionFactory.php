<?php

namespace Database\Factories;

use App\Models\Member;
use App\Models\Package;
use App\Models\Subscription;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Subscription>
     */
    protected $model = Subscription::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-60 days', 'now')->format('Y-m-d');
        $endDate = Carbon::parse($startDate)->addDays(30)->format('Y-m-d');
        $status = Carbon::parse($endDate)->isPast() ? 'expired' : 'active';

        return [
            'member_id' => Member::factory(),
            'package_id' => Package::factory(),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'status' => $status,
        ];
    }

    /**
     * Indicate that the subscription is active.
     */
    public function active(): static
    {
        return $this->state(function (array $attributes) {
            $startDate = $this->faker->dateTimeBetween('-15 days', 'now')->format('Y-m-d');
            $endDate = Carbon::parse($startDate)->addDays(30)->format('Y-m-d');
            
            return [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => 'active',
            ];
        });
    }

    /**
     * Indicate that the subscription is expired.
     */
    public function expired(): static
    {
        return $this->state(function (array $attributes) {
            $startDate = $this->faker->dateTimeBetween('-90 days', '-35 days')->format('Y-m-d');
            $endDate = Carbon::parse($startDate)->addDays(30)->format('Y-m-d');
            
            return [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => 'expired',
            ];
        });
    }
}