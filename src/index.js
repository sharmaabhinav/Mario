import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import * as serviceWorker from './serviceWorker';

const columnCount = Number(window.prompt('Please enter board width'))
const rowCount =  Number(window.prompt('Please enter board height'))
ReactDOM.render(<Game rowCount={rowCount} columnCount={columnCount} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
