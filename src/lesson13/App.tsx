import * as React from "react";
import * as ReactDOM from "react-dom";

interface AppState {
    red: number;
}

interface AppControls {
    red?: NumInput
}

export default class App extends React.Component<any, AppState> {
    public controls: AppControls = {};

    constructor() {
        super();

        this.update = this.update.bind(this);
        this.state = {
            red: 0
        };
    }

    public componentDidMount() {
        this.update();
    }

    public update() {
        let control = this.controls.red.controls.input;
        let value = ReactDOM.findDOMNode<HTMLInputElement>(control).value;

        this.setState({
            red: parseInt(value, 10)
        });
    }

    public render() {
        return (
            <div>
                <NumInput
                    ref={(input) => this.controls.red = input}
                    type="range"
                    min={0}
                    max={255}
                    step={5}
                    value={this.state.red}
                    label="Red"
                    update={this.update}
                />
            </div>
        );
    }
}

type NumInputTypes = "number" | "range";

interface NumInputProps {
    type: NumInputTypes,
    min?: number,
    max?: number,
    step?: number,
    value?: number,
    update: React.FormEventHandler<HTMLInputElement>,
    label?: string
}

interface NumInputControls {
    input?: any
}

class NumInput extends React.Component<NumInputProps, any> {
    public controls: NumInputControls = {};

    private static defaultProps: NumInputProps = {
        type: "range",
        min: 0,
        max: 0,
        step: 1,
        value: 0,
        update: function() {},
        label: ""
    };

    render() {
        let label = this.props.label !== ""
            ? <label>{this.props.label} - {this.props.value}</label>
            : "";

        return (
            <div>
                <input
                    ref={(input) => this.controls.input = input}
                    type={this.props.type}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    defaultValue={this.props.value.toString()}
                    onChange={this.props.update}
                />
                {label}
            </div>
        );
    }
}
