import * as React from "react";
import * as ReactDOM from "react-dom";

export default class App extends React.Component<any, AppState> {
    public controls: AppControls = {};

    constructor() {
        super();

        this.update = this.update.bind(this);
        this.state = {
            red: 0,
            green: 0,
            blue: 0
        };
    }

    public componentDidMount() {
        this.update();
    }

    public update() {
        let redControl = this.controls.red.controls.input;
        let greenControl = this.controls.green.controls.input;
        let blueControl = this.controls.blue.controls.input;

        let redValue = ReactDOM.findDOMNode<HTMLInputElement>(redControl).value;
        let greenValue = ReactDOM.findDOMNode<HTMLInputElement>(greenControl).value;
        let blueValue = ReactDOM.findDOMNode<HTMLInputElement>(blueControl).value;

        this.setState({
            red: parseInt(redValue, 10),
            green: parseInt(greenValue, 10),
            blue: parseInt(blueValue, 10)
        });
    }

    public render() {
        let style = {
            backgroundColor: `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})`,
            color: "white"
        };

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
                <NumInput
                    ref={(input) => this.controls.green = input}
                    type="range"
                    min={0}
                    max={255}
                    step={5}
                    value={this.state.green}
                    label="Green"
                    update={this.update}
                />
                <NumInput
                    ref={(input) => this.controls.blue = input}
                    type="range"
                    min={0}
                    max={255}
                    step={5}
                    value={this.state.blue}
                    label="Blue"
                    update={this.update}
                />

                <div style={style}>
                    Hello, World!
                </div>
            </div>
        );
    }
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

interface AppState {
    red: number;
    green: number;
    blue: number;
}

interface AppControls {
    red?: NumInput;
    green?: NumInput;
    blue?: NumInput;
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
