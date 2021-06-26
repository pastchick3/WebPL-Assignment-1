import { Lexer } from "./lexer.mjs";
import { Parser } from "./parser.mjs";
import { InvalidToken, InvalidStatement } from "./structure.mjs";

function run(source) {
    source = source.trim();
    if (source === "") {
        return "Oops, empty input.";
    }

    try {
        let lexer = new Lexer(source);
        let tokens = lexer.run();
        let parser = new Parser(tokens);
        let statements = parser.run();
        let output = statements.map(stmt => stmt.to_html()).join("");
        return output;
    } catch (err) {
        if (err instanceof InvalidToken) {
            return err.message;
        } else if (err instanceof InvalidStatement) {
            return err.message;
        } else {
            throw err;
        }
    }
}

Window.highlighter = {
    run: run,
};
