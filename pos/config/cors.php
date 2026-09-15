<?php

return [
    'paths' => ['api/*'],
    'allowed-method' => ['GET', 'POST', 'UPDATE', 'DELETE'],
    'allowed-origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
    'allowed-headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
    'supports-credentials' => true 
];