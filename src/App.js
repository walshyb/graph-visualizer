import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import Node from './components/Node';

export default class App extends Component {
  state = {
    nodes: []
  };

  handleClick = ( event ) => {
    const { x, y } = event.target.getPointerPosition();
    let nodes = this.state.nodes;
    nodes.push(<Node key={nodes.length} x={x} y={y} />);

    this.setState({
      ...this.state,
      nodes: nodes
    });

  }

  render() {
    return (
      <div className="App">
        <Stage width={500} height={500} onClick={this.handleClick}>
          <Layer>
            { this.state.nodes }
          </Layer>
        </Stage>
      </div>
    );
  }
}
