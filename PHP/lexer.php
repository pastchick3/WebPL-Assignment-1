<?php

require_once "structure.php";

class Lexer
{
    private $source;
    private $length;
    private $index;
    private $tokens;

    public function __construct($source)
    {
        $this->source = $source;
        $this->length = strlen($source);
        $this->index = 0;
        $this->tokens = [];
    }

    public function run()
    {
        while (!$this->is_end()) {
            $this->skip_whitespaces();
            $this->tokens[] = $this->read_token();
        }
        return $this->tokens;
    }

    private function is_end()
    {
        return $this->index >= $this->length;
    }

    private function skip_whitespaces()
    {
        while (ctype_space($this->current_char())) {
            $this->forward();
        }
    }

    private function current_char()
    {
        return $this->source[$this->index];
    }

    private function forward()
    {
        $this->index += 1;
    }

    private function read_token()
    {
        switch ($this->current_char()) {
            case "=":
                $this->forward();
                return new Equal();
            case ";":
                $this->forward();
                return new Semicolon();
            case "+":
                $this->forward();
                $integer = $this->read_integer();
                return new Integer($integer);
            case "-":
                $this->forward();
                $integer = $this->read_integer();
                return new Integer("-" . $integer);
            default:
                if (ctype_digit($this->current_char())) {
                    $integer = $this->read_integer();
                    return new Integer($integer);
                } else {
                    $word = $this->read_word();
                    if ($word === "let") {
                        return new Let();
                    } else {
                        return new Identifier($word);
                    }
                }
        }
    }

    private function read_integer()
    {
        $integer = "";
        while (!$this->is_end() && ctype_digit($this->current_char())) {
            $integer .= $this->current_char();
            $this->forward();
        }
        return $integer;
    }

    private function read_word()
    {
        $word = $this->current_char();
        if ($word !== "_" && !ctype_alpha($word)) {
            throw new InvalidToken("Invalid token.");
        }
        $this->forward();
        while (
            !$this->is_end()
            && ($this->current_char() === "_" || ctype_alnum($this->current_char()))
        ) {
            $word .= $this->current_char();
            $this->forward();
        }
        return $word;
    }
}
