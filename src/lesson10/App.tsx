// Lesson 10: Component Lifecycle - Mounting Usage

import * as React from "react";
import * as ReactDOM from "react-dom";
import Timer = NodeJS.Timer;

interface AppState {
    val: number;
    m: number;
}

class App extends React.Component<any, AppState> {
    public state: AppState;
    private inc: Timer;

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
        } as AppState)
    }

    componentWillMount(): void {
        this.setState({ m: 2 } as AppState);
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

export default class Wrapper extends React.Component<any, any> {
    private static mount() {
        ReactDOM.render(<App />, document.getElementById("mounter"));
    }

    private static unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById("mounter"));
    }

    render() {
        return (
            <div>
                <button onClick={Wrapper.mount.bind(this)}>Mount</button>
                <button onClick={Wrapper.unmount.bind(this)}>Unmount</button>
                <div id="mounter"></div>
            </div>
        );
    }
}
