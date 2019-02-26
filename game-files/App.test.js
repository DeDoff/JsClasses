import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme from 'enzyme';
import { shallow, mount, render  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
 


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("New Tests", ()=> {

  beforeEach(() => {
    // const div = document.createElement('div');
    // ReactDOM.render(<App />, div);
    
  });


  it(`Кнопка старт`, () => {
    //c.find('button').prop('onClick')()
    const wrapper = shallow(<App  />);
    wrapper.instance().onPlay();
    let state = wrapper.instance().state;
    //expect(true).toEqual(true); 
    expect(state.isPlaying).toBe(true); 
  
  });

  it(`Кнопка стоп`, () => {
    const wrapper = shallow(<App  />);
    wrapper.instance().onPlay();

    let intervalId = setInterval(() => {
      clearInterval(intervalId)
    }, 3000);

    wrapper.instance().onStop();
    //expect(false).toBe(false); 
    expect(wrapper.instance().state.isPlaying).toBe(false); 
  });

  it(`Наличие компонента Game`, () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<Game />, div);
    // ReactDOM.unmountComponentAtNode(div);
    // const wrapper = shallow(<Game />);
    // console.log(wrapper);
  });

  
  it(`Наличие компонента Point`, () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<Point />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  it(`Наличие компонента GameActions`, () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<GameActions />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  it(`GameActions.Start`, () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<ActionStart />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  it(`GameActions.Pause`, () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<ActionPause />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });
  
  it(`Наличие компонента GameOptions`, () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<GameOptions />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });

  it(`GameOptions.Size(x,y)`, () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<GameSize />, div);
    // ReactDOM.unmountComponentAtNode(div);
  });
});



const {Game} = require("./components/ComponentGame.js");
let game;
describe("game", () => {
  beforeEach(() => {
    game = new Game([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ]);
  });

  it(`в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, 
      зарождается жизнь;`, () => {
    const x = 0;
    const y = 2;
    const life = game.lifeCellCount(x, y);
    let isLive = game.isLive(x, y);

    expect(life).toBe(3);
    expect(isLive).toBe(false);

    game.step();

    isLive = game.isLive(x, y);
    expect(isLive).toBe(true);
  });

  it(`если у живой клетки есть две или три живые соседки, 
      то эта клетка продолжает жить;`, () => {
    const x = 1;
    const y = 1;
    let isLive = game.isLive(x, y);
    const life = game.lifeCellCount(x, y);

    expect(isLive).toBe(true);
    expect(life).toBe(2);

    game.step();

    isLive = game.isLive(x, y);
    expect(isLive).toBe(true);
  });

  it(`если соседей меньше двух или больше трёх, клетка умирает 
  («от одиночества» или «от перенаселённости»)`, () => {
    const x = 1;
    const y = 3;
    let isLive = game.isLive(x, y);
    const life = game.lifeCellCount(x, y);

    expect(isLive).toBe(true);
    expect(life).toBe(1);

    game.step();

    isLive = game.isLive(x, y);
    expect(isLive).toBe(false);
  });

  it(`заканчивается если - на поле не останется ни одной «живой» клетки`, () => {
    let simpleGame = new Game([
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ]);

    let isEnded = simpleGame.isEnded();
    expect(isEnded).toBe(false);

    simpleGame.step();

    isEnded = simpleGame.isEnded();
    expect(isEnded).toBe(true);
  });
});