<?php

// Colors used for highlighting different tokens.
define("LET_RGB", "rgb(86,156,214)");
define("IDENTIFIER_RGB", "rgb(156,220,254)");
define("EQUAL_RGB", "rgb(255,255,255)");
define("INTEGER_RGB", "rgb(181,206,168)");
define("SEMICOLON_RGB", "rgb(255,255,255)");

// Format tokens and statements as HTML.
interface ToHTML
{
    public function to_html();
}

// Token definitions with class name cosntants used for assertions.
define("LET_CLS", "Let");
class Let implements ToHTML
{
    public function to_html()
    {
        return sprintf('<span style="color:%s;">let</span>', LET_RGB);
    }
}

define("IDENTIFIER_CLS", "Identifier");
class Identifier implements ToHTML
{
    public $literal;

    public function __construct($literal)
    {
        $this->literal = $literal;
    }

    public function to_html()
    {
        return sprintf('<span style="color:%s;">%s</span>', IDENTIFIER_RGB, $this->literal);
    }
}

define("EQUAL_CLS", "Equal");
class Equal implements ToHTML
{
    public function to_html()
    {
        return sprintf('<span style="color:%s;">=</span>', EQUAL_RGB);
    }
}

define("INTEGER_CLS", "Integer");
class Integer implements ToHTML
{
    public $literal;

    public function __construct($literal)
    {
        $this->literal = $literal;
    }

    public function to_html()
    {
        return sprintf('<span style="color:%s;">%s</span>', INTEGER_RGB, $this->literal);
    }
}

define("SEMICOLON_CLS", "Semicolon");
class Semicolon implements ToHTML
{
    public function to_html()
    {
        return sprintf('<span style="color:%s;">;</span>', SEMICOLON_RGB);
    }
}

// Statement definitions.
class Initialization implements ToHTML
{
    public $let;
    public $identifier;
    public $equal;
    public $integer;
    public $semicolon;

    public function __construct($let, $identifier, $equal, $integer, $semicolon)
    {
        $this->let = $let;
        $this->identifier = $identifier;
        $this->equal = $equal;
        $this->integer = $integer;
        $this->semicolon = $semicolon;
    }

    public function to_html()
    {
        return sprintf(
            "%s&nbsp;%s&nbsp;%s&nbsp;%s%s<br>",
            $this->let->to_html(),
            $this->identifier->to_html(),
            $this->equal->to_html(),
            $this->integer->to_html(),
            $this->semicolon->to_html(),
        );
    }
}

class Assignment implements ToHTML
{
    public $identifier;
    public $equal;
    public $integer;
    public $semicolon;

    public function __construct($identifier, $equal, $integer, $semicolon)
    {
        $this->identifier = $identifier;
        $this->equal = $equal;
        $this->integer = $integer;
        $this->semicolon = $semicolon;
    }

    public function to_html()
    {
        return sprintf(
            "%s&nbsp;%s&nbsp;%s%s<br>",
            $this->identifier->to_html(),
            $this->equal->to_html(),
            $this->integer->to_html(),
            $this->semicolon->to_html(),
        );
    }
}

// Exception definitions.
class InvalidToken extends Exception
{
}

class InvalidStatement extends Exception
{
}
