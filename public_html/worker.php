<?php
header("Cross-Origin-Opener-Policy: same-origin");
header("Cross-Origin-Embedder-Policy: require-corp");
header('Content-Type: application/javascript');
include(__DIR__ . "/assets/" . explode("/",$_SERVER["REQUEST_URI"])[2]);
