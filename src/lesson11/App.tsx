// Lesson 11: Component Lifecycle - Updating

import * as React from "react";
import * as ReactDOM from "react-dom";

interface AppProps {
    val?: number;
}

interface AppState {
    increasing: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
    static defaultProps: AppProps = {
        val: 0
    };

    constructor() {
        super();

        this.update = this.update.bind(this);
        this.state = {
            increasing: false
        };
    }

    public componentWillReceiveProps(nextProps: AppProps) {
        this.setState({
            increasing: nextProps.val > this.props.val
        });
    }

    public shouldComponentUpdate(nextProps: AppProps, nextState: AppState) {
        return nextProps.val % 5 === 0;
    }

    public componentDidUpdate(prevProps: AppProps, prevState: AppState) {
        console.log("prevProps", prevProps);
        console.log("prevState", prevState);
    }

    public update() {
        ReactDOM.render(
            <App val={this.props.val+1} />,
            document.getElementById("app")
        );
    }

    public render() {
        console.log(this.state.increasing);
        return (
            <button className="btn" onClick={this.update}>
                {this.props.val}
            </button>
        );
    }
}
