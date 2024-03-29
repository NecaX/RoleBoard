import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Util.js';

import Login from './Login';
import App from './App';
import SelectGameMode from './SelectGameMode';
import CreateCharacter from './CreateCharacter/CreateCharacter';
import CreateCampaign from './CreateCampaign/CreateCampaign';
import CampaignDashboard from './CampaignDashboard/CampaignDashboard';


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
                <Route path="/sgm/:id/"  component={ SelectGameMode } />
                <Route path="/cch/:id/:code"  component={ CreateCharacter } />
                <Route path="/create-campaign/:id"  component={ CreateCampaign } />
                <Route path="/campaign-dashboard/:id"  component={ CampaignDashboard } />
                <Route path="/app/:username/:password"  component={ App } />
            </div>
        </HashRouter>
    </div>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
