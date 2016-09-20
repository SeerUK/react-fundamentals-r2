// @flow
// Lesson 10: Component Lifecycle - Mounting Usage

import React from "react";
import ReactDOM from "react-dom";

type AppState = {
    val: number,
    m: number
};

class App extends React.Component {
    state: AppState;
    inc: number;

    constructor() {
        super();

        this.state = {
            val: 0,
            m: 1
        };

        this.update = this.update.bind(this);
    }

    update(): void {
        this.setState({
            val: this.state.val + 1
        })
    }

    componentWillMount(): void {
        this.setState({ m: 2 });
    }

    componentDidMount(): void {
        this.inc = setInterval(this.update, 500);
    }

    componentWillUnmount(): void {
        clearInterval(this.inc);
    }

    render() {
        return (
            <button onClick={this.update}>{this.state.val * this.state.m}</button>
        );
    }
}

export default class Wrapper extends React.Component {
    constructor() {
        super();
    }

    mount() {
        ReactDOM.render(<App />, document.getElementById("mounter"));
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById("mounter"));
    }

    render() {
        return (
            <div>
                <button onClick={this.mount.bind(this)}>Mount</button>
                <button onClick={this.unmount.bind(this)}>Unmount</button>
                <div id="mounter"></div>
            </div>
        );
    }
}
