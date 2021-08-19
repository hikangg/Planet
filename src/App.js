import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./app/view/Home";
import Planet from "./app/view/Planet";

function App() {
    
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route exact path={"/"} component={Home} />
                    <Route exact path={"/planet"} component={Planet} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;
