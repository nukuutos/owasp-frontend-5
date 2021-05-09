import { useState } from 'react';

import SignIn from './pages/sign-in';
import Alert from './utils/alert';
import Search from './pages/search';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

const App = () => {
  const [alerts, setAlerts] = useState([]);

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" render={() => <Search />} />
          {/* if access token */}
          {false && <Route exact path="/sign-in" render={() => <SignIn setAlerts={setAlerts} />} />}
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
