<?php

require_once "lexer.php";
require_once "parser.php";

$source = trim(file_get_contents("php://input"));

if ($source === "") {
    echo "Oops, empty input.";
    return;
}

$lexer = new Lexer($source);
try {
    $tokens = $lexer->run();
} catch (InvalidToken $err) {
    echo $err->getMessage();
    return;
}

$parser = new Parser($tokens);
try {
    $statements = $parser->run();
} catch (InvalidStatement $err) {
    echo $err->getMessage();
    return;
}

foreach ($statements as $statement) {
    echo $statement->to_html();
}
