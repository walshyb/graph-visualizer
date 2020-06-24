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
    nodes.push(<Node key={nodes.length} x={x} y={y} name={nodes.length} />);

    this.setState({
      ...this.state,
      nodes: nodes
    });

  }

  render() {
    return (
      <div className="App">
        <h1>Click to create a node:</h1>
        <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.handleClick}>
          <Layer>
            { this.state.nodes }
          </Layer>
        </Stage>
      </div>
    );
  }
}
