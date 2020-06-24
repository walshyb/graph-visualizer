import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle, Label, Tag } from 'react-konva';
import Konva from 'konva';

export default class Node extends Component {
  state = {
    color: 'white'
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

  render() {
    const { x, y } = this.props;

    return (
      <Circle
        x={x}
        y={y}
        width={50}
        height={50}
        fill={this.state.color}
        value={1}
        name="A"
        stroke="black"
        label="hi"
        onClick={this.handleClick}
      />
    );
  }
}
