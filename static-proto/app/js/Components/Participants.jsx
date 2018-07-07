import React from "react";
import TimeAgo from "react-timeago";
import PropTypes from "prop-types";

export default class Participants extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            participants: props.client.getParticipants()
        }
        props.client.on("participants", this.onClientParticipants);
    }
    
    static defaultProps = {
        client: null
    }

    static propTypes = {
        client: PropTypes.object.isRequired
    }

    onClientParticipants = (participants) => {
        this.setState({
            participants: participants
        });
    }

    render() {
        return (
            <div className="pan pane-sm sidebar">
                <ui className="list-group">
                    {this.state.participants.map((user) => (
                        <li className="list-group=item" key={user.name}>
                            <div className="media-body">
                                <strong><span className="icon icon-user"></span>&nbsp;{user.name}</strong>
                                <p>Joined <TimeAgo date={user.time}/></p>
                            </div>
                        </li>
                    ))}
                </ui>
            </div>
        );
    }
}