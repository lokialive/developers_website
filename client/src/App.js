import React from 'react'
import { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
// import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credentials/AddExperience'
import AddEducation from './components/add-credentials/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import PrivateRoute from './common/PrivateRoute'
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { setCurrentUser, logoutUser } from './actions/authActions'
import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import CreateProfile from './components/create-profile/CreateProfile'
import Post from './components/post/Post'
import CompanyComponent from './components/detail/Company'
import SearchComponent from './components/search'

import HomeComponent from './components/homePage/HomeComponent'
import CreateCompanyProfile from './components/create-profile/CreateCompanyProfile'
import EditCompanyProfile from './components/edit-profile/EditCompanyProfile'
import AddWork from './components/create-profile/AddWork'
import AnonyProfile from './components/Anonymous/AnonyProfile'
import AnonyHome from './components/Anonymous/AnonyHome'
import LoginHome from './components/Home/LoginHome'
import AdminCompanies from './components/Admin/AdminCompanies'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)

  // decode token
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  // chekc if the token is expired; If expired, jump to the login page.
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/anony/home" component={AnonyHome} />

              {/*12.6- new component*/}
              <Route path="/companies/*" component={CompanyComponent} />
              <Route exact path="/search" component={SearchComponent} />
              <Route
                exact
                path="/company/HomePage/:handle"
                component={HomeComponent}
              />

              <Route
                exact
                path="/profile/loading"
                redirect="/profile/:handle"
              />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route
                exact
                path="/profile/anony/:handle"
                component={AnonyProfile}
              />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/home" component={LoginHome} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/admin-companies"
                  component={AdminCompanies}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-company-profile"
                  component={CreateCompanyProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-company-profile"
                  component={EditCompanyProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-work" component={AddWork} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
            </div>
            {/* <Footer /> */}
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
