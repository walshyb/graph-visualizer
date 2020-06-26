import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Circle, Label, Text } from 'react-konva';

export default class Node extends Component {
  state = {
    nodeX: this.props.x,
    nodeY: this.props.y,
    color: 'white',
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    createLine: PropTypes.func.isRequired
  };

  /**
   * Pass up x and y values to create
   * a new line (edge)
   */
  handleClick = ( event ) => {
    // TODO:
    //
    // Find approach where Node
    // has constant access to its own
    // attributes without needing event object
    const x = event.target.getParent().x();
    const y = event.target.getParent().y();

    this.props.createLine(x, y);
  };

  onDragMove = ( event ) => {
    this.setState({
      ...this.state,
      nodeX: event.target.x(),
      nodeY: event.target.y()
    });
  }

  onDragEnd = ( event ) => {
    //console.log('end', event);
  }

  onMouseLeave = ( event ) => {
    //console.log('mouseleave', event);
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
        onMouseLeave={ this.onMouseLeave }
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
