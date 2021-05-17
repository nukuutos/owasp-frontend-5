import { useState } from 'react';

import SignIn from './pages/sign-in';
import Alert from './utils/alert';
import Search from './pages/search';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState(null);
  const [alerts, setAlerts] = useState([]);

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Search setToken={setToken} token={token} setAlerts={setAlerts} />} />
          {!token && (
            <Route exact path="/sign-in" render={() => <SignIn setToken={setToken} setAlerts={setAlerts} />} />
          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>

        <Alert alertsState={[alerts, setAlerts]} />
      </div>
    </Router>
  );
};

export default App;
