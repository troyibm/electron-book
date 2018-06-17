import React from "react";

export default class Participants extends React.Component {

    render() {
        return (
            <div className="pan pane-sm sidebar">
                <ui className="list-group">
                    <li className="list-group=item">
                        <div className="media-body">
                            <strong><span className="icon icon-user"></span>&nbsp;Name</strong>
                            <p>Joined 2 min ago</p>
                        </div>
                    </li>
                </ui>
            </div>
        );
    }
}