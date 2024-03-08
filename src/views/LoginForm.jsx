import React from 'react';
import './LoginForm.css'
import { useState, useEffect } from 'react';
import FloatLabel from '../components/FloatLabel';
import SubmitButton from '../components/SubmitButton';


export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    var isSingin = true;


    const alterLoginRegister = () => {
        const contElement = document.querySelector('.cont');
        if (contElement) {
            contElement.classList.toggle('s-signup', isSingin);
            isSingin = !isSingin; // Alternando o valor de register após alterar a classe
        }
    };

    return (
        <div id="container-login">
            <div className='cont'>
                <div className="form sign-in">
                    <h2>LOGIN</h2>
                    <FloatLabel label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FloatLabel label="Senha" name="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <SubmitButton label="Login" onClick={() => console.log('Login')} />
                    <p className="forgot-pass">Forgot Password ?</p>
                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img-logo">Logo</div>
                        <div className="img-text">
                            <p>Faça login facilmente!</p>
                            <div className='singin-social-media'><a>Logo 1</a>
                                <a>logo 2</a>
                                <a>Logo 3</a></div>
                        </div>
                        {/* <div className="img-btn" onClick={alterLoginRegister}>
                            <span className="m-up">Sign Up</span>
                            <span className="m-in">Sign In</span>
                        </div> */}
                    </div>
                    <div className="form sign-up">
                        <h2>Sign Up</h2>
                        <label>
                            <span>Name</span>
                            <input type="text" />
                        </label>
                        <label>
                            <span>Email</span>
                            <input type="email" />
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password" />
                        </label>
                        <label>
                            <span>Confirm Password</span>
                            <input type="password" />
                        </label>
                        <button type="button" className="submit" >Sign Up Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}