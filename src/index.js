import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid'
import ControlsNavBar from './ControlsNavBar';
import './index.css';
class Main extends React.Component {
  delay = 100;
  setCellSelected = (row, col, selected) => {
    if(selected == this.state.grid[row][col]) {
      return;
    }
    let gridCopy = this.gridCopy();
    gridCopy[row][col] = selected;
    this.delay = 100;
    this.setState({ grid: gridCopy, generation: 0 });
  }

  seed = (probability) => {
    let grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        grid[i][j] = Math.random() < probability ? true : false;
      }
    }
    this.setState({ grid: grid });
  }

  play = () => {
    clearInterval(this.intervalId);
    this.setState({ running: true });
    this.intervalId = setInterval(this.update, this.delay);
  }

  pause = () => {
    this.setState({ running: false });
    clearInterval(this.intervalId);
  }

  setPattern = (p) => {
    switch (p) {
      case 0:
        this.seed(0.3); break;
    }
  }

  setSpeed = (speed) => {
    switch (speed) {
      case 1://slow
        this.delay = 500; break;
      case 2://average
        this.delay = 200; break;
      case 3://fast
        this.delay = 50; break;
    }
    if (this.state.running) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.update, this.delay);
    }
  }

  clear = () => {
    this.pause();
    this.setState({ grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)) });
  }

  update = () => {
    if (!this.state.running) {
      //console.log("Update: Not running");
      return;
    }
    //console.log('Update: running');
    let grid = this.state.grid;
    let gridCopy = this.gridCopy();
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let n = this.aliveNeighborsCount(i, j);
        if (grid[i][j]) {
          if (n == 2 || n == 3) {
            continue;
          }
          gridCopy[i][j] = false;
        }
        else {
          if (n == 3) {
            gridCopy[i][j] = true;
          }
        }
      }
    }
    this.setState({ grid: gridCopy, generation: this.state.generation + 1 });
  }

  aliveNeighborsCount = (row, col) => {
    let neighbors = this.neighbors(row, col);
    let count = 0;
    neighbors.forEach(neighbor => {
      if (neighbor) {
        count++;
      }
    });
    return count;
  }

  neighbors = (row, col) => {
    let grid = this.state.grid;
    let neighbors = [];
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i == row && j == col) {
          continue;
        }
        if (i < 0 || j < 0 || i >= this.rows || j >= this.cols) {
          continue;
        }
        neighbors.push(grid[i][j]);
      }
    }
    return neighbors;
  }

  gridCopy = () => {
    let gridCopy = [];
    for (let i = 0; i < this.rows; i++) {
      gridCopy[i] = [];
      for (let j = 0; j < this.cols; j++) {
        gridCopy[i][j] = this.state.grid[i][j];
      }
    }
    return gridCopy;
  }

  constructor() {
    super();
    this.rows = Math.floor((window.innerHeight - 100) / 16 - 1);
    this.cols = Math.floor((window.innerWidth - 2) / 16);
    this.state = {
      grid: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
      running: false
    };
  }
  
  render() {
    return (
      <div id='main'>

        <ControlsNavBar
          running={this.state.running} setPattern={this.setPattern} play={this.play} pause={this.pause} clear={this.clear} setSpeed={this.setSpeed}>
        </ControlsNavBar>
        <Grid rows={this.rows} cols={this.cols} grid={this.state.grid} setCellSelected={this.setCellSelected}>
        </Grid>
      </div>
    );
  }

}

ReactDOM.render(<Main />, document.getElementById('root'));

