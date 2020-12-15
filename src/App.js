import './App.css';
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/enterqrcode" component={EnterQRCode}></Route>
        <Route exact path="/logout" component={Landing}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/settings" component={Settings}></Route>
        <Route exact path="/verifyAccount" component={VerifyAccount}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/createProject" component={CreateProject}></Route>
        <Route exact path="/projects/:id/tasks" component={TaskList}></Route>
        <Route exact path="/projects/:id/createTask" component={CreateTask}></Route>
        <Route exact path="/projects/:id/update" component={UpdateProject}></Route>
        <Route exact path="/tasks/:id/update" component={UpdateTask}></Route>
        <Route exact path="/tasks/db" component={TaskDB}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
