import React, { Component } from 'react';
import Cell from './Cell'

class Grid extends Component {
    
    first = true;
    render() {
        
        let cells = [];
        for (let row = 0; row < this.props.rows; row++) {
            for (let col = 0; col < this.props.cols; col++) {
                let className = '';
                className = this.props.grid[row][col] ? 'cell-on' : 'cell-off';
                cells.push(<Cell className= {className} row={row} col={col} setCellSelected={this.props.setCellSelected} />)
            }
        }

        const width = this.props.cols * 16;
        return (
            <div draggable='false' className='grid' style={{ width: width }}>
                {cells}
            </div>
        )
    }
}

export default Grid