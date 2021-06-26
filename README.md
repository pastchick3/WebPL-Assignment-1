# Web Programming Languages Assignment 1

This is the code repository for the Assignment 1 of Web Programming Languages course. It is a simple syntax highlighter written in both PHP and React.

## Usages

``` PowerShell
# PHP
> path/to/php -S localhost:8000 -t path/to/WebPL-Assignment-1/PHP/
# React
> path/to/python3 -m http.server 8000 -d path/to/WebPL-Assignment-1/React/
# Now you can access `http://localhost:8000/index.html`.
```

## Supported Grammar

``` EBNF
<non-digit> ::= "A" | "B" | "C" | "D" | "E" | "F" | "G"
                | "H" | "I" | "J" | "K" | "L" | "M" | "N"
                | "O" | "P" | "Q" | "R" | "S" | "T"
                | "U" | "V" | "W" | "X" | "Y" | "Z"
                | "a" | "b" | "c" | "d" | "e" | "f" | "g"
                | "h" | "i" | "j" | "k" | "l" | "m" | "n"
                | "o" | "p" | "q" | "r" | "s" | "t"
                | "u" | "v" | "w" | "x" | "y" | "z"
                | "_";
<digit> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

<identifier> ::= <non-digit> (<digit> | <non-digit>)*;
<integer> ::= ["+" | "-"] <digit>+;

<initialization> ::= "let" <identifier> "=" <integer> ";";
<assignment> ::= <identifier> "=" <integer> ";";
```

## Tested Environments

This project is tested with `Microsoft Edge Version 91 (64-bit)`, `PHP 8.0.7 (VS16 x64 Non Thread Safe)`, and `Python 3.8.5 (WSL2)`. Other dependencies, e.g., React and Bootstrap, are loaded dynamically from CDN with fixed version numbers.
