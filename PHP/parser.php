<?php

require_once "structure.php";

class Parser
{
    private $tokens;
    private $length;
    private $index;
    private $statements;

    public function __construct($tokens)
    {
        $this->tokens = $tokens;
        $this->length = count($tokens);
        $this->index = 0;
        $this->statements = [];
    }

    public function run()
    {
        while (!$this->is_end()) {
            $this->statements[] = $this->parse_statement();
        }
        return $this->statements;
    }

    private function is_end()
    {
        return $this->index >= $this->length;
    }

    private function current_token()
    {
        return $this->tokens[$this->index];
    }

    // Assert the current token is of the expected type.
    // If the assertion succeeds, return the current token and move to the next token.
    private function assert_token($expected)
    {
        if ($this->is_end()) {
            throw new InvalidStatement("Unexpected EOF.");
        }
        $token = $this->current_token();
        if (get_class($token) === $expected) {
            $this->index += 1;
            return $token;
        } else {
            throw new InvalidStatement("Invalid statement.");
        }
    }

    private function parse_statement()
    {
        switch (get_class($this->current_token())) {
            case LET_CLS:
                return $this->parse_initialization();
            case IDENTIFIER_CLS:
                return $this->parse_assignment();
            default:
                throw new InvalidStatement("Invalid statement.");
        }
    }

    private function parse_initialization()
    {
        $let = $this->assert_token(LET_CLS);
        $identifier = $this->assert_token(IDENTIFIER_CLS);
        $equal = $this->assert_token(EQUAL_CLS);
        $integer = $this->assert_token(INTEGER_CLS);
        $semicolon = $this->assert_token(SEMICOLON_CLS);
        return new Initialization($let, $identifier, $equal, $integer, $semicolon);
    }

    private function parse_assignment()
    {
        $identifier = $this->assert_token(IDENTIFIER_CLS);
        $equal = $this->assert_token(EQUAL_CLS);
        $integer = $this->assert_token(INTEGER_CLS);
        $semicolon = $this->assert_token(SEMICOLON_CLS);
        return new Assignment($identifier, $equal, $integer, $semicolon);
    }
}
