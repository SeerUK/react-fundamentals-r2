// Lesson 12: Higher Order Components (replaces Mixins)

import * as React from "react"

interface MixinProps {
    txt?: string;
}

interface MixinState {
    val: number;
}

function mixin(InnerComponent, debounce: number) {
    return class extends React.Component<MixinProps, MixinState> {
        public static defaultProps = {
            debounce: 1
        };

        constructor() {
            super();

            this.update = this.update.bind(this);
            this.state = { val: 0 };
        }

        public update() {
            this.setState({
                val: this.state.val + 1
            });
        }

        public shouldComponentUpdate(nextProps: MixinProps, nextState: MixinState) {
            // Take next state, and a parameter of this mixin function
            return nextState.val % debounce === 0;
        }

        public render() {
            return <InnerComponent update={this.update} {...this.state} {...this.props} />
        }
    }
}

const Button = (props) => <button onClick={props.update}>{props.txt} - {props.val}</button>
const Label = (props) => <label onMouseMove={props.update}>{props.txt} - {props.val}</label>

let ButtonMixed = mixin(Button, 1);
let LabelMixed = mixin(Label, 50);

export default class App extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <LabelMixed txt="Button" />
                <ButtonMixed txt="Button" />
            </div>
        );
    }
}
