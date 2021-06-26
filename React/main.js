"use strict";

function SyntaxHighter() {
    const [source, setSource] = React.useState("");

    return (
        <div>
            <Title />
            <Input setSource={setSource} />
            <p></p>
            <Output source={source} />
        </div>
    );
}

function Title() {
    return (
        <div className="row">
            <div className="col">
                <h1>Syntax Highlighter</h1>
            </div>
        </div>
    );
}

function Input(props) {
    let input = React.createRef();

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="input" className="form-label">Please input the source code here:</label>
                <textarea id="input" className="form-control" ref={input}></textarea>
            </div>
            <button className="btn btn-secondary" onClick={_ => props.setSource(input.current.value)}>Submit</button>
        </div>
    );
}

function Output(props) {
    return (
        <div className="row border border-secondary rounded font-monospace text-start">
            <div className="col">
                <div dangerouslySetInnerHTML={{ __html: Window.highlighter.run(props.source) }}></div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <SyntaxHighter />,
    document.getElementById("root"),
);
