import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import {publicRoutes} from './helpers/routes.ts';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <AppBar />
                <Routes>
                    {publicRoutes.map(({path, Component}) => (
                        <Route key={path} path={path} element={<Component />}></Route>
                    ))}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
