import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import '../src/static/style.css';

//Main render Parent that has only one child component: App
ReactDom.render(<BrowserRouter basename="/"> <App /> </BrowserRouter>, document.querySelector('#root'));