import './App.css';
import Header from "./components/Header";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import VerifyAccount from './components/user/VerifyAccount';
import Dashboard from './components/Dashboard';
import CreateProject from './components/project/CreateProject';
import UpdateProject from './components/project/UpdateProject';
import TaskList from './components/task/TaskList';
import CreateTask from './components/task/CreateTask';
import UpdateTask from './components/task/UpdateTask';
import TaskDB from './components/task/TaskDB'
import Settings from './components/user/Settings'
import EnterQRCode from './components/user/EnterQRCode';
import NotFound from './components/common/NotFound';
import { getJWTToken } from './helpers/securityUtils'

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        getJWTToken() !== null
            ? <Component {...props} />
            : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
    )} />
);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/enterqrcode" component={EnterQRCode}></Route>
            <Route exact path="/logout" component={Landing}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <ProtectedRoute exact path="/settings" component={Settings}></ProtectedRoute>
            <Route exact path="/verifyAccount" component={VerifyAccount}></Route>
            <ProtectedRoute exact path="/dashboard" component={Dashboard}></ProtectedRoute>
            <ProtectedRoute exact path="/createProject" component={CreateProject}></ProtectedRoute>
            <ProtectedRoute exact path="/projects/:id/tasks" component={TaskList}></ProtectedRoute>
            <ProtectedRoute exact path="/projects/:id/createTask" component={CreateTask}></ProtectedRoute>
            <ProtectedRoute exact path="/projects/:id/update" component={UpdateProject}></ProtectedRoute>
            <ProtectedRoute exact path="/tasks/:id/update" component={UpdateTask}></ProtectedRoute>
            <ProtectedRoute exact path="/tasks/db" component={TaskDB}></ProtectedRoute>
            <Route component={NotFound}></Route>
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
