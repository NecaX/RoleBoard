import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Util.js';

import Login from './Login';
import App from './App';
import SelectGameMode from './SelectGameMode';
import CreateCharacter from './CreateCharacter/CreateCharacter';
import CreateCampaign from './CreateCampaign/CreateCampaign';


import {
    HashRouter,
    Route
  } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div className="root">
        <HashRouter>
            <div >
                <Route path="/" exact     component={ Login } />
                <Route path="/sgm/:username/"  component={ SelectGameMode } />
                <Route path="/cch/:username/:code"  component={ CreateCharacter } />
                <Route path="/create-campaign/:username"  component={ CreateCampaign } />
                <Route path="/app/:username/:password"  component={ App } />
            </div>
        </HashRouter>
    </div>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
