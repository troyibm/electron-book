import React from "react";
import PropTypes from "prop-types";

const ENTER_KEY = 13;

export default class Conversation extends React.Component {

    constructor(props) {
        super(props);
        this.messages = [];
        this.state ={
            messages: []
        }
        props.client.on("text", this.onClientText);
    }

    static defaultProps = {
        client: null
    }

    static propTypes = {
        client: PropTypes.object.isRequired
    }

    onClientText = ( msg ) => {
        msg.time = new Date(msg.dateTime);
        this.messages.unshift(msg);
        this.setState({
            messages: this.messages
        });
    }

    static normalizeTime(date, now, locale) {
        const isToday = (now.toDateString() === date.toDateString());
        // when locale is undefined, toLocaleDateString/toLocateTimeString use default locale
        return isToday ? date.toLocaleTimeString(locale) : date.toLocaleDateString(locale) + ` ` + date.toLocaleTimeString(locale);
    }

    onKeyDown = (e) => {
        if (e.which === ENTER_KEY && !e.ctrlKey && !e.metaKey &&!e.shiftKey) {
            e.preventDefault();
            this.submit();
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.submit();
    }

    submit() {
        this.props.client.message(this.inputEl.value);
        this.inputEl.value = "";
    }

    render() {
        const { messages } = this.state;
        return (
            <div className="pane padded-more l-chat">
                <ul className="list-group l-chat-conversation">
                    {messages.map((msg, i) => (
                        <li className="list-group-item" key={i}>
                            <div className="media-body">
                                <time className="media-body__time">{Conversation.normalizeTime(msg.time, new Date())}</time>
                                <strong>{msg.userName}:</strong>
                                    {msg.text.split("\n").map((line, inx) => (
                                        <p key={ionx}>{line}</p>
                                    ))}
                            </div>
                        </li>
                    ))}
                </ul>
                <form onSubmit={this.onSubmit} className="l-chat-form">
                    <div className="form-group">
                        <textarea required placeholder="Say something..." onKeyDown={this.onKeyDown} className="form-control" ref={el=> {this.inputEl = el;}}></textarea>
                    </div>
                    <div className="form-actions">
                        <button className="btn btn-form btn-primary">OK</button>
                    </div>
                </form>
            </div>
        );
    }
}