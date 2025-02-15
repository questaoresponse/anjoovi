<?php
declare(strict_types=1);

namespace FastRoute\Test;

use FastRoute\RouteCollector;

class DummyRouteCollector extends RouteCollector
{
    /** @var mixed[] */
    public array $routes = [];

    public function __construct()
    {
    }

    /**
     * {@inheritDoc}
     */
    public function addRoute($httpMethod, string $route, mixed $handler): void
    {
        $route = $this->currentGroupPrefix . $route;
        $this->routes[] = [$httpMethod, $route, $handler];
    }
}
