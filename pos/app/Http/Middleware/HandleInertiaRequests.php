<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return array_merge(parent::share($request), [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'auth' => [
                'user' => $request->user(),
                'permissions' => [
                    'categories' => [
                        'viewAny' => $user?->can('viewAny', Category::class),
                        'create' => $user?->can('create', Category::class),
                        'update' => $user ? in_array($user->role, ['staff', 'admin']) : false
                    ],
                    'suppliers' => [
                        'viewAny' => $user?->can('viewAny', Supplier::class),
                        'create' => $user?->can('create', Supplier::class),
                        'update' => $user?->can($user->role, Supplier::class),
                    ],
                    'batches' => [
                        'viewAny' => $user?->can('viewAny', Batch::class),
                        'create' => $user?->can('create', Batch::class)
                    ]
                ]
            ],
        ]);
    }
}
