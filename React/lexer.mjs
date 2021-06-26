import * as Structs from "./structure.mjs";

export class Lexer {
    #source;
    #index;
    #tokens;

    constructor(source) {
        this.#source = source;
        this.#index = 0;
        this.#tokens = [];
    }

    run() {
        while (!this.#is_end()) {
            this.#skip_whitespaces();
            this.#tokens.push(this.#read_token());
        }
        return this.#tokens;
    }

    #is_end() {
        return this.#index >= this.#source.length;
    }

    #skip_whitespaces() {
        while (this.#current_char().match(/\s/)) {
            this.#forward();
        }
    }

    #current_char() {
        return this.#source[this.#index];
    }

    #forward() {
        this.#index += 1;
    }

    #read_token() {
        let integer, word;
        switch (this.#current_char()) {
            case "=":
                this.#forward();
                return new Structs.Equal();
            case ";":
                this.#forward();
                return new Structs.Semicolon();
            case "+":
                this.#forward();
                integer = this.#read_integer();
                return new Structs.Integer(integer);
            case "-":
                this.#forward();
                integer = this.#read_integer();
                return new Structs.Integer("-" + integer);
            default:
                if (this.#current_char().match(/\d/)) {
                    integer = this.#read_integer();
                    return new Structs.Integer(integer);
                } else {
                    word = this.#read_word();
                    if (word === "let") {
                        return new Structs.Let();
                    } else {
                        return new Structs.Identifier(word);
                    }
                }
        }
    }

    #read_integer() {
        let integer = "";
        while (!this.#is_end() && this.#current_char().match(/\d/)) {
            integer += this.#current_char();
            this.#forward();
        }
        return integer;
    }

    #read_word() {
        let word = this.#current_char();
        if (!word.match(/\w/)) {
            throw new Structs.InvalidToken("Invalid token.");
        }
        this.#forward();
        while (!this.#is_end() && this.#current_char().match(/\w/)) {
            word += this.#current_char();
            this.#forward();
        }
        return word;
    }
}
