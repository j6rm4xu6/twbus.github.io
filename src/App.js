import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import Footer from './components/footer';
import Header from './components/header';
import styles from './App.module.less';

import BusDynamicsPage from './pages/BusDynamics';
import UndonePage from './pages/Undone';
import configureStore from './store';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'semantic-ui-less/semantic.less';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <section className={styles.App_section}>
            <Switch>
              <Route exact path="/news" component={UndonePage} />
              <Route exact path="/" component={BusDynamicsPage} />
              <Route exact path="/router-search" component={UndonePage} />
              <Route exact path="/near-router" component={UndonePage} />
              <Route exact path="/other-info" component={UndonePage} />
            </Switch>
          </section>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
