import React, { Component } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Node from './components/Node';

export default class App extends Component {
  state = {
    nodes: [], // vertices
    lines: [], // edges,
    cursorX: null,
    cursorY: null,
    originalX: null,
    originalY: null,
    addingLine: false,
  };

  handleClick = ( event ) => {
    // Ignore this function from handling clicks on nodes
    if(event.target.getClassName() !== 'Stage') {
      if(event.target.getParent().getClassName() === 'Label' && this.state.addingLine) {

        // TODO:
        // stop tracking new line coords,
        // save <Line /> to this.state.lines,
        // turn off add line
        // reset x and y values in state
        this.setState({
        });
      }

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
  createLine = ( x, y ) => {
    this.setState({
      ...this.state,
      addingLine: true,
      originalX: x,
      originalY: y
    });
  }

  /**
   * On mouse move on stage, update cursor x and y
   */
  mouseOver = (event) => {
    if (event.target.getClassName() !== 'Stage') {
      return null;
    }

    const { x, y } = event.target.getPointerPosition();

    this.setState({
      ...this.state,
      cursorX: x,
      cursorY: y
    });
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
            { this.state.addingLine ?
                <Line 
                  stroke="black"
                  strokeWidth={ 5 }
                  draggable={ true }
                  key={Math.random()}
                  ref={ ref => ( this.line = ref ) }
                  points={[
                    this.state.originalX, this.state.originalY, this.state.cursorX, this.state.cursorY 
                  ]}
                />
                : null
            }
          </Layer>
        </Stage>
      </div>
    );
  }
}
