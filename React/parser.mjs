import * as Structs from "./structure.mjs";

export class Parser {
    #tokens;
    #index;
    #statements;

    constructor(tokens) {
        this.#tokens = tokens;
        this.#index = 0;
        this.#statements = [];
    }

    run() {
        while (!this.#is_end()) {
            this.#statements.push(this.#parse_statement());
        }
        return this.#statements;
    }

    #is_end() {
        return this.#index >= this.#tokens.length;
    }

    #current_token() {
        return this.#tokens[this.#index];
    }

    // Assert the current token is of the expected type.
    // If the assertion succeeds, return the current token and move to the next token.
    #assert_token(expected) {
        if (this.#is_end()) {
            throw new Structs.InvalidStatement("Unexpected EOF.");
        }
        let token = this.#current_token();
        if (token instanceof expected) {
            this.#index += 1;
            return token;
        } else {
            throw new Structs.InvalidStatement("Invalid statement.");
        }
    }

    #parse_statement() {
        let token = this.#current_token();
        if (token instanceof Structs.Let) {
            return this.#parse_initialization();
        } else if (token instanceof Structs.Identifier) {
            return this.#parse_assignment();
        } else {
            throw new Structs.InvalidStatement("Invalid statement.");
        }
    }

    #parse_initialization() {
        let let_ = this.#assert_token(Structs.Let);
        let identifier = this.#assert_token(Structs.Identifier);
        let equal = this.#assert_token(Structs.Equal);
        let integer = this.#assert_token(Structs.Integer);
        let semicolon = this.#assert_token(Structs.Semicolon);
        return new Structs.Initialization(let_, identifier, equal, integer, semicolon);
    }

    #parse_assignment() {
        let identifier = this.#assert_token(Structs.Identifier);
        let equal = this.#assert_token(Structs.Equal);
        let integer = this.#assert_token(Structs.Integer);
        let semicolon = this.#assert_token(Structs.Semicolon);
        return new Structs.Assignment(identifier, equal, integer, semicolon);
    }
}
