// import Register from './components/Auth/Register'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import List from './pages/List'

import Create from './pages/Create'

function App() {
    return (
        <div className="app">
            <Switch>
                <Route path={'/'} exact component={Home} />
                <Route path={'/register'} component={Register} />
                <Route path={'/login'} component={Login} />
                <Route path={'/add'} component={Create} />
                <Route path={'/list'} component={List} />

                {/* <Route path={'/register'} component={Register}></Route> */}
            </Switch>
        </div>
    )
}

export default App
