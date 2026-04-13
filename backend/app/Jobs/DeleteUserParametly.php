<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class DeleteUserParametly implements ShouldQueue
{
	use Queueable;
	protected $user;

	/**
	 * Create a new job instance.
	 */
	public function __construct(User $user)
	{
		$this->user = $user;
	}

	/**
	 * Execute the job.
	 */
	public function handle(): void
	{
		$user = User::withTrashed()->find($this->user->id);
		if ($user->trashed())
		{
			$user->forceDelete();
		}
	}
}
