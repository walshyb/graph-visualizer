import React, { Component } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Node from './components/Node';

export default class App extends Component {
  state = {
    nodes: [], // vertices
    lines: [], // edges,
    cursorX: null,
    cursorY: null,
    addingLine: false
  };

  handleClick = ( event ) => {
    // Ignore this function from handling clicks on nodes
    if(event.target.getClassName() !== 'Stage') {
      // TODO:
      //
      // check if node was clicked.
      //
      // if addingLine is true, end line adding here
      console.log(event);
      return null;
    }

    // Get position
    const { x, y } = event.target.getPointerPosition();
    console.log(x, y);
    let nodes = this.state.nodes;

    // Add new node to list of nodes
    nodes.push(
      <Node
        key={ nodes.length } 
        x={ x }
        y={ y }
        name={ nodes.length } 
        createLine={ this.createLine }
      />
    );

    // Update state with list of nodes
    this.setState({
      ...this.state,
      nodes: nodes
    });
  }

  /**
   * Creates a line from an originating
   * x and y to the cursor
   *
   * @param Number x
   * @param Number y
   */
  createLine = (x, y) => {
    let line = (<Line 
      stroke="black"
      strokeWidth={ 5 }
      draggable={ true }
      key={Math.random()}
      ref={ ref => ( this.line = ref ) }
      points={[
        x, y, x, y 
      ]}
    />);

    let { lines } = this.state;
    lines.push(line);

    this.setState({
      ...this.state,
      lines,
      addingLine: true
    });
  }

  mouseOver = (event) => {
    if (event.target.getClassName() !== 'Stage') {
      return null;
    }

    const { addingLine, lines } = this.state;
    const { x, y } = event.target.getPointerPosition();
    
    if(addingLine) {
      // get last line
      const originalX = this.line.points()[0];
      const originalY = this.line.points()[1];

      this.line.points([originalX, originalY, x, y])
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Click to create a node:</h1>
        <Stage
          width={ window.innerWidth }
          height={ window.innerHeight }
          onClick={ this.handleClick }
          ref={ ref => ( this.stage = ref ) }
          onMouseMove={ this.mouseOver }
        >
          <Layer>
            { this.state.nodes }
          </Layer>
          <Layer>
            { this.state.lines }
          </Layer>
        </Stage>
      </div>
    );
  }
}
