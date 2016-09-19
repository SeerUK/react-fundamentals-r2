// Lesson 08: Accessing Child Properties

import React from "react";

export default class App extends React.Component {
    render() {
        // Content from inside the component here...
        return <Button>I <Heart /> React</Button>;
    }
}

class Button extends React.Component {
    render() {
        // Ends up being transcluded where {this.props.children} is here:
        return (
            <div>
                <h1>Look at this!</h1>
                <button>{this.props.children}</button>
            </div>
        );
    }
}

const Heart = () => <span className="glyphicon glyphicon-heart" />
