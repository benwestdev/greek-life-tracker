import React, { Component } from "react";
import { Message } from "semantic-ui-react";

import "./style.css";

export default class Msg extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  handleDismiss = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    if (this.props.timed) {
      setTimeout(() => {
        this.setState({ visible: false });
      }, 3500);
    }
  }

  render() {
    const { visible } = this.state;
    const { error, header, content } = this.props;
    if (visible && error) {
      return (
        <Message
          className="msg"
          negative
          onDismiss={this.handleDismiss}
          header={header || "Whoops!"}
          content={content || "Had an unknown issue...maybe try it again?"}
        />
      );
    } else if (visible && !error) {
      return (
        <Message
          className="msg"
          positive
          onDismiss={this.handleDismiss}
          header={header || "Whoops!"}
          content={content || "Had an unknown issue...maybe try it again?"}
        />
      );
    } else {
      return null;
    }
  }
}
