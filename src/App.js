import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Places from "./components/screens/Places";
import Place from "./components/screens/Place";
import NotFound from "./components/screens/NotFound";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import React, { useState, useEffect } from 'react';

export const UserContext = React.createContext();


function App(props) {
    const [userdata, setUserdata] = useState({});
    const updateUserData = (action) => {
        switch (action.type) {
            case "LOGOUT":
                setUserdata(null);
                localStorage.clear();
                break;
            case "LOGIN":
                setUserdata(action.payload);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setUserdata(JSON.parse(localStorage.getItem("user_data")));

    }, [])
    return (
        <div>
            <UserContext.Provider value={{userdata, updateUserData}}>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Places} />
                        <Route path="/auth/login/" exact component={Login} />
                        <Route path="/auth/create/" exact component={Signup} />
                        <Route path="/place/:id" component={Place} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
