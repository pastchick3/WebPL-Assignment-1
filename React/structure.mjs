// Colors used for highlighting different tokens.
const LET_RGB = "rgb(86,156,214)";
const IDENTIFIER_RGB = "rgb(156,220,254)";
const EQUAL_RGB = "rgb(255,255,255)";
const INTEGER_RGB = "rgb(181,206,168)";
const SEMICOLON_RGB = "rgb(255,255,255)";

// Token definitions.
export class Let {
    to_html() {
        return `<span style="color:${LET_RGB};">let</span>`;
    }
}

export class Identifier {
    literal;

    constructor(literal) {
        this.literal = literal;
    }

    to_html() {
        return `<span style="color:${IDENTIFIER_RGB};">${this.literal}</span>`;
    }
}

export class Equal {
    to_html() {
        return `<span style="color:${EQUAL_RGB};">=</span>`;
    }
}

export class Integer {
    literal;

    constructor(literal) {
        this.literal = literal;
    }

    to_html() {
        return `<span style="color:${INTEGER_RGB};">${this.literal}</span>`;
    }
}

export class Semicolon {
    to_html() {
        return `<span style="color:${SEMICOLON_RGB};">;</span>`;
    }
}

// Statement definitions.
export class Initialization {
    let_;
    identifier;
    equal;
    integer;
    semicolon;

    constructor(let_, identifier, equal, integer, semicolon) {
        this.let_ = let_;
        this.identifier = identifier;
        this.equal = equal;
        this.integer = integer;
        this.semicolon = semicolon;
    }

    to_html() {
        return (
            `${this.let_.to_html()}&nbsp;`
            + `${this.identifier.to_html()}&nbsp;`
            + `${this.equal.to_html()}&nbsp;`
            + `${this.integer.to_html()}`
            + `${this.semicolon.to_html()}<br>`
        );
    }
}

export class Assignment {
    identifier;
    equal;
    integer;
    semicolon;

    constructor(identifier, equal, integer, semicolon) {
        this.identifier = identifier;
        this.equal = equal;
        this.integer = integer;
        this.semicolon = semicolon;
    }

    to_html() {
        return (
            `${this.identifier.to_html()}&nbsp;`
            + `${this.equal.to_html()}&nbsp;`
            + `${this.integer.to_html()}`
            + `${this.semicolon.to_html()}<br>`
        );
    }
}

// Error definitions.
export class InvalidToken extends Error { }

export class InvalidStatement extends Error { }
