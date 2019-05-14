import React from 'react';
import logo from '../logo.svg';
import './Loading.css';

const Loading = () => (
    <div className="App-loading">
        <div className="mask"></div>
        <img src={logo} className="App-logo" alt="logo" />
    </div>
)

export default Loading;