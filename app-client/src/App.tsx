import React from 'react';
import { Provider} from 'react-redux';
import { Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import { CreateCandidateForm } from './components/candidate-create-form';
import { EditCandidateForm } from './components/candidate-edit-form';
import Dashboard from './components/Dashboard';

import Login from './components/Login';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <div className="container">
          < Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/create" component={CreateCandidateForm} />
              <Route exact path="/edit/:id" component={EditCandidateForm} />
            </Switch>
          </div> 
        </React.Fragment>
      </Router>
    </Provider>
  );
}
export default App;
