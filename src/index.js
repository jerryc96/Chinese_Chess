import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class Piece extends Component {
	constructor(props){
		super(props);
		this.state = {
			pos: this.props.pos,
			canCrossRiver: true,
			canCrossPalace: true,
			col: this.props.col
		}
	};
};

class Position extends Component {
	constructor(props){
		super(props);
		this.state = {
			pos: this.props.pos,
			hasPiece: false
		}
	}
	setHasPiece(){
		this.setState({
			pos:this.props.pos,
			hasPiece: !this.state.hasPiece
		});
	}
	render(){
		return (
			<div className="pos">
			</div>
		);
	}
};

class Square extends Component {
	constructor(props){
		super(props);
		this.state = {
			corners: this.props.corners
		};
	};
	render(){
		return (
			<div className="square">
		    </div>
		);
	}
};

class PalaceSquare extends Square {
	render(){
		return (
			<div className={this.props.dir}>
			</div>
		)
	}
}

class River extends Component {
	render(){
		return (
			<div className="river">
			<p className="river-p">River</p>
			</div>
		);
	}
}

// need board and pieces
class Board extends Component{
	// 9x11 board, river on row 6, two 3x3 palaces
	// general chinese chess notation for western players, based off chess
	static defaultProps = {
		board: [
		["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"],
      	["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2"],
      	["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3"],
      	["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4"],
      	["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5"],
      	["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6"],
      	["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "i7"],
      	["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "i8"],
      	["a9", "b9", "c9", "d9", "e9", "f9", "g9", "h9", "i9"],
      	["a10", "b10", "c10", "d10", "e10", "f10", "g10", "h10", "i10"]
      	],
      	blackPalace: ["d8", "e8", "f8", "d9", "e9", "f9", "d10", "e10", "f10"],
      	redPalace: ["d1", "e1", "f1", "d2", "e2", "f2", "d3", "e3", "f3"]
	};
	constructor(props) {
      super(props);
    };
    // render the positions necessary to keep track of play.
    renderPos(board){
    	var pos = []
		for (var i=0; i<board.length; i++){
			pos.push([]);
			for (var j=0; j<board[0].length; j++){
				pos[i].push(<Position key={board[i][j]} pos={board[i][j]}/>);
			}
		}
		return pos;
    };
    render(){
    	var board = this.props.board;
    	const rowCount = 4, colCount = 8;
    	return (
    	  <div className="board">
    		<div className="board-buffer"></div>
    		<div className="board-space">
    		{this.renderPos(board)}
    		{
    		// draw the top half of the board
    			[...new Array(rowCount)].map((x, rowIndex) => {
    				return (
    					<div className="board-row" key={rowIndex}>
    					{[...new Array(colCount)].map((y, colIndex) => {
    						var corners = [[board[rowIndex][colIndex], board[rowIndex][colIndex+1]],
    									   [board[rowIndex+1][colIndex], board[rowIndex+1][colIndex+1]]
    									  ];
    						if (rowIndex === 0 && colIndex === 3){
    							return (<PalaceSquare key={corners} corners={corners} dir="square palace-l"/>)
    						}
    						else if (rowIndex === 0 && colIndex === 4){
    							return (<PalaceSquare key={corners} corners={corners} dir="square palace-r"/>)
    						}
    						else if (rowIndex === 1 && colIndex === 3){
    							return (<PalaceSquare key={corners} corners={corners} dir="square palace-r"/>)
    						}
    						else if (rowIndex === 1 && colIndex === 4){
    							return (<PalaceSquare key={corners} corners={corners} dir="square palace-l"/>)
    						}
    						else{
    							return (<Square key={corners} corners={corners}/>)
    						}

    					})}
    					</div>
    				)
    			})
    		}
    		<River />
    		{
    			// draw the bottom half of the board
    			[...new Array(rowCount)].map((x, rowIndex) => {
    				return (
    					<div className="board-row" key={rowIndex}>
    					{[...new Array(colCount)].map((y, colIndex) => {
    						var corners = [[board[rowIndex+5][colIndex], board[rowIndex+5][colIndex+1]],
    									   [board[rowIndex+6][colIndex], board[rowIndex+6][colIndex+1]]
    									  ]
    						if (rowIndex === 2 && colIndex === 3){
    							return (<PalaceSquare key={corners} corners={corners} dir="square palace-l"/>)
    						}
    						else if (rowIndex === 2 && colIndex === 4){
    							return (<PalaceSquare key={corners} corners={corners} dir="square palace-r"/>)
    						}
    						else if (rowIndex === 3 && colIndex === 3){
    							return (<PalaceSquare key={corners} corners={corners} dir="square palace-r"/>)
    						}
    						else if (rowIndex === 3 && colIndex === 4){
    							return (<PalaceSquare key={corners} corners={corners} dir="square palace-l"/>)
    						}
    						else{
    							return (<Square key={corners} corners={corners}/>)
    						}
    					})}
    					</div>
    				)
    			})
    		}
    		</div>
    		<div className="board-buffer"></div>
    	  </div>

    		
    		// draw a square for every 4 corners, defined by the four positions on the board
    		// however, four palace squares must be drawn for d1 -> f3 and d8 -> f8
    		// draw a river to seperate row 5 with row 6
    	);
    };
};


ReactDOM.render(
  <Board/>,
  document.getElementById('root')
);












// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
