import React, { Component } from 'react';
import styles from './App.css'
import { Game } from './components/ComponentGame';


const GameRow = ({row,y, onClick})=>{
  
  return <div className='game-row'>{
    row.map((number, index)=> <Cell key={y + index} col={number} x={index} y={y} onClick={onClick} />)
  }</div>
}
const Cell = ({col, onClick, x, y})=>{
  return <span className={`game-cell game-cell--${col}`} onClick={()=> onClick && onClick(x,y)}>
    {col}
  </span>;
}

const GameComponent = ({arr, onCellClick})=>{
  return <div className='game'>
    {
      arr.map((row, index)=> <GameRow key={index} row={row} y={index} onClick={onCellClick}/>) 
    }

  </div>
}


class App extends Component {
  state={
    x:0,
    y:0,
    isPlaying :false,
    arr : [],
    intervalId: 0,
  }

  onXInputChange = (e)=>{
    this.setState({
      x:parseInt(e.target.value),
      arr: this.createArray(parseInt(e.target.value), this.state.y)

    });
  }

  onYInputChange = (e)=>{
    this.setState({
      y: parseInt(e.target.value),
      arr: this.createArray(this.state.x, parseInt(e.target.value))
    });
  }

  createArray(x,y){
    const xLvArr = (new Array(x)).fill(0);
    const yLvArr = (new Array(x)).fill(0).map(()=> xLvArr.slice());
    return yLvArr;
  }

  onCellClick = (x, y) => {
    const { arr } = this.state;
    arr[y][x] =  arr[y][x] === 0 ? 1 : 0;

    const newArr = arr.map(e => e.slice());

    this.setState({
      arr: newArr,
    })
  }

  onPlay = () => {
    const { arr } = this.state;
    this.game = new Game(arr);


    let intervalId = setInterval(() => {
      this.game.step();
      const newArr = this.game.getArena().map(e => e.slice());

      this.setState({
        arr: newArr,
      });
    }, 1000);
    
    this.setState({
      isPlaying: true,
      intervalId : intervalId,
    })
  }

  onStop = () =>{
    this.setState({
      isPlaying: false
    })

    if(this.state.intervalId){
      clearInterval(this.state.intervalId)
    }
  }

  render() {

    const {x,y, arr, isPlaying} = this.state;
    //const arr = thsi.createArray(x,y);

    return (
      <div>
        <div>
          <div>
            <label>X:{x}</label>
          </div>
          <input type="number" onInput={this.onXInputChange}></input>
          <div>
            <label>Y:{y}</label>
          </div>
          <input type="number" onInput={this.onXInputChange}></input>
        </div>
        <div>
          <GameComponent arr={arr} onCellClick={isPlaying?undefined: this.onCellClick} />
        </div>

        <div>
          <div>
            <button onClick={this.onPlay}>Play</button>
          </div>
          <div>
            <button onClick={this.onStop}>Stop</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

export{
  App
}
