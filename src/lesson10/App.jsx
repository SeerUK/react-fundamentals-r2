// Lesson 10: Component Lifecycle - Mounting Usage

import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            val: 0
        };

        this.update = this.update.bind(this);
    }

    update() {
        this.setState({
            val: this.state.val + 1
        })
    }

    componentWillMount() {
        this.setState({ m: 2 });
    }

    componentDidMount() {
        this.inc = setInterval(this.update, 500);
    }

    componentWillUnmount() {
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
