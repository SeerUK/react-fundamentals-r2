// Lesson 07: Using Refs to Access Components

import * as React from "react";

interface AppProps {
    cat: number;
}

export default class App extends React.Component<AppProps, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div>Hello, Banana!</div>
        );
    }
}
