import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle, Label, Text, Line } from 'react-konva';
import Konva from 'konva';

export default class Node extends Component {
  state = {
    nodeX: this.props.x,
    nodeY: this.props.y,
    color: 'white',
    children: [],
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
    let { children } = this.state;
    let line = 
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

  onDragMove = ( event ) => {
    this.setState({
      ...this.state,
      nodeX: event.target.x(),
      nodeY: event.target.y()
    });
  }

  onDragEnd = ( event ) => {
    console.log('end', event);
  }

  render() {
    const { name } = this.props;
    const { nodeX, nodeY } = this.state;

    return (
      <Label
        x={ nodeX }
        y={ nodeY }
        onClick={ this.handleClick }
        draggable={ true }
        onDragMove={ this.onDragMove }
        onDragEnd={ this.onDragEnd }
      >
        <Circle
          width={ 50 }
          height={ 50 }
          fill={ this.state.color }
          value={ 1 }
          stroke="black"
        />
        <Text
          fontSize={ 16 }
          text={ name }
          fill="black"
          offsetX={ 5 }
          offsetY={ 7 }
        />
      </Label>
    );
  }
}
