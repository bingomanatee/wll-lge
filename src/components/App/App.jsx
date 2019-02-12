import React, {Component} from 'react';
import _ from 'lodash';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import sc from 'styled-components';
import BGGrassTiler from './../../js/BGGrassTiler';
import Navbar from '../Navbar';
import Homepage from '../Homepage';
import Article from '../Article';
import Category from '../Category';

const BG_GREEN = '#3d431d';

const SiteFrame = sc.div`
  width: 100vw;
  height: 100vh
  background-color: transparent;
  justify-content: start;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

const Content = sc.div`
flex: 1;
overflow-y: auto;
`;

const Background = sc.div`
  background: black;
z-index: -1000;
width: 100vw;
height: 100vh;
position: fixed;
left: 0;
top: 0;
overflow: hidden;
display: fixed;
`;


(function () {
  var throttle = function (type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle('resize', 'optimizedResize');
})();


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenSize: {width: window.innerWidth, height: innerHeight},
    };
  }

  componentDidMount() {
    window.addEventListener('optimizedResize', _.debounce(this.redrawBG.bind(this), 500));
    this.initPixi();
    this.rebindMouseListener();
  }

  redrawBG() {
    const frame = document.getElementById('site-frame');
    this.setState({
      screenSize: {
        width: frame.clientWidth,
        height: frame.clientHeight
      }
    }, () => {
      this.initPixi();
      this.rebindMouseListener();
    });
  }

  mouseMoveListener(event) {
    if (this.drawer) {
      this.drawer.mouseMove(event.clientX, event.clientY);
    }
  }

  rebindMouseListener() {
    if (!this._boundML) {
      this._boundML = _.throttle(this.mouseMoveListener.bind(this), 200);
    }
    if (this._lastFrame) {
      this._lastFrame.removeEventListener('mousemove', this._boundML);
    }
    let frame = document.getElementById('site-frame');
    this._lastFrame = frame;
    frame.addEventListener('mousemove', this._boundML);

  }

  initPixi() {
    this.initPixi = _.debounce(() => this.initPixiReal(), 500);
    this.initPixi();
  }

  initPixiReal() {
    if (this.drawer) {
      this.drawer.stop();
    }
    console.log('initing pixi');
    this.drawer = new BGGrassTiler(this.state.screenSize, document.getElementById('site-background'));
  }

  render() {
    return (
      <BrowserRouter>
        <SiteFrame id="site-frame" data-id="site-frame">
          <Background id="site-background">
          </Background>
          <Navbar/>
          <Content>
            <Switch>
              <Route path="/" exact component={Homepage}/>
              <Route path="/article/:path*" component={Article}/>
              <Route path="/category/:directory*" component={Category}/>
            </Switch>
          </Content>
        </SiteFrame>
      </BrowserRouter>
    );
  }
}
