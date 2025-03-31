import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import {AuthProvider} from './auth/Context';
import React, {useEffect} from 'react';
import Layout from './components/Layout/index';
import Profile from './pages/Profile';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Agendamento from './pages/Agendamento/agendamento';
import Medicine from "./pages/Medicine/Show/Medicine.jsx";
import ResetPassword from './pages/Forgot_Password/index.jsx';
import Medications from './pages/Medications/Medications';

function App() {

    const [user, setUser] = React.useState(null)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            setUser(token)
        }
    }, [])

    return (
        <AuthProvider>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path='/medicamentos' element={<Medications/>}/>
                    <Route path='/medicamentos/:id' element={<Medicine/>}/>
                      <Route path='/agendamento' element={<Agendamento />} />
                </Route>
                {user ? '' : <Route path="/login" element={<Login/>}/>}
                <Route path='/resetpassword' element={<ResetPassword/>}/>
            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{width: "50%"}}
            />
        </AuthProvider>

    )
}

export default App
