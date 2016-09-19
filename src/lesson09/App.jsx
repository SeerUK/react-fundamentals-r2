// Lesson 09: Component Lifecycle - Mounting Basics

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
        console.log("Mounting...");
    }

    componentDidMount() {
        console.log("Mounted!");
    }

    componentWillUnmount() {
        console.log("Unmounting...");
    }

    render() {
        console.log("Rendering!");

        return (
            <button onClick={this.update}>{this.state.val}</button>
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
