import React from 'react';
import ReactDOM from 'react-dom';
import Axios, { AxiosRequestConfig } from 'axios';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Round from './Round';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './state';
import Setup from './Setup';
import Courses from './Courses';
import { SWRConfig } from 'swr';

Axios.defaults.baseURL = 'http://localhost:3000';

const swrOptions = {
  dedupingInterval: 120000,  
  fetcher: (url: string, config?: AxiosRequestConfig) => Axios.get(url, config).then(res => res.data)
}

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={swrOptions}>
      <StateProvider>
        <Router>
          <Switch>
          <Route path="/courses">
            <Courses />
          </Route>
          <Route path="/round">
            <Round />
          </Route>
          <Route path="/setup">
            <Setup />
          </Route>
          </Switch>
        </Router>
      </StateProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
