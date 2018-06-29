import React from "react";
import { remote } from "electron";
const win = remote.getCurrentWindow();

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isMaximized: win.isMaximized() };
    }

    componentWillMount() {
        win.on("maximize", this.updateState);
        win.on("unmaximize", this.updateState);
    }
    
    updateState = () => {
        this.setState({isMaximized: win.isMaximized()});
    }

    render() {
        const { isMaximized } = this.state;
        return (
            <header className="toolbar toolbar-header">
                <div className="toolbar-actions">
                    <button className="btn btn-default pull-right" onClick={this.onClose}>
                        <span className="icon icon-cancel"></span>
                    </button>
                    { isMaximized ? (
                        <button className="btn btn-default pull-right" onClick={this.onRestore}>
                            <span className="icon icon-resize-small"></span>
                        </button>
                        ): (
                        <button className="btn btn-default pull-right" onClick={this.onMaximize}>
                            <span className="icon icon-resize-full"></span>
                        </button>
                        )
                    }
                </div>
            </header>
        );
    }

    onRestore = () => {
        win.restore();
    }

    onMaximize = () => {
        win.maximize();
    }

    onClose = () => {
        win.close();
    }
}