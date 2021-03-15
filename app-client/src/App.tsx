import { Provider} from 'react-redux';
import { Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Alerts, {alertOptions} from './components/AlertManager';
import { CreateCandidateForm } from './components/candidate-create-form';
import { EditCandidateForm } from './components/candidate-edit-form';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Login from './components/Login';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Router>
        <div className="container">
          <Alerts/>
          <Header />
          < Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/create" component={CreateCandidateForm} />
              <Route exact path="/edit/:id" component={EditCandidateForm} />
            </Switch>
        </div>
      </Router>
      </AlertProvider>
    </Provider>
  );
}
export default App;
