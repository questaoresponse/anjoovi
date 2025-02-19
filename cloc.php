<?php

function parse() {
	$file = file_get_contents('.clocignore');
	$lines = explode("\n", $file);
	return array_filter($lines, function($line) {
		return trim($line) && $line[0] !== '#';
	});
}

function getArguments() {
	$lines = parse();
	$files = [];
	$directories = [];

	foreach ($lines as $item) {
		$item = preg_quote($item);
		$isFile = strpos($item, '.') !== false;

		if ($isFile) {
			$files[] = $item;
		} else {
			$directories[] = $item;
		}
	}

	$flags = [];
	if (count($directories) > 0) {
		$dirRegex = implode('|', $directories);
		$flags[] = "--not-match-d=\"($dirRegex)\"";
	}

	if (count($files) > 0) {
		$filesRegex = implode('|', $files);
		$flags[] = "--not-match-f=\"($filesRegex)\"";
	}

	return implode(' ', $flags);
}

$arguments = getArguments();
$handle = popen("cloc web/components", "r"); // Abre o processo para leitura

if ($handle) {
    while (!feof($handle)) {
        echo fgets($handle); // Lê a saída do processo em tempo real
        ob_flush();
        flush(); // Força a exibição imediata da saída
    }
    pclose($handle);
}