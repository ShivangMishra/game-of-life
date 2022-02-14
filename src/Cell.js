import React, { Component } from 'react';

class Cell extends Component {
    constructor() {
        super();
        this.state = {};
    }
    onMouseDown = (event) => {
        if (event.buttons != 1) {
            return;
        }
        if (event.ctrlKey) {
            this.props.setCellSelected(this.props.row, this.props.col, false);
        }
        else {
            this.props.setCellSelected(this.props.row, this.props.col, true);
        }
    }

    onMouseEnter = (event) => {
        if (event.buttons != 1) {
            return;
        }
        if (event.ctrlKey) {
            this.props.setCellSelected(this.props.row, this.props.col, false);
        }
        else {
            this.props.setCellSelected(this.props.row, this.props.col, true);
        }
    }

    render() {
        return (
            <div className={this.props.className} onDragStart={(event) => { event.preventDefault(); }} onMouseEnter={this.onMouseEnter} onMouseDown={this.onMouseDown}>

            </div>
        )
    }
}

export default Cell