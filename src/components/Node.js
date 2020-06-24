import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle, Label, Text } from 'react-konva';
import Konva from 'konva';

export default class Node extends Component {
  state = {
    color: 'white'
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired
  };

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

  render() {
    const { x, y, name } = this.props;

    return (
      <Label
        x={x}
        y={y}
      >
        <Circle
          width={50}
          height={50}
          fill={this.state.color}
          value={1}
          stroke="black"
          label="hi"
          onClick={this.handleClick}
        />
        <Text
          fontSize={16}
          text={name}
          fill="black"
          offsetX={5}
          offsetY={7}
        />
      </Label>
    );
  }
}
