import React from 'react';
import './LoginForm.scss'
import { useState, useEffect } from 'react';
import FloatLabel from '../../components/FloatLabel';
import SubmitButton from '../../components/SubmitButton';
import { FaFacebookSquare, FaApple } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import  UserService  from '../../service/UserService';

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    var isSingin = true;


    const alterLoginRegister = () => {
        console.log(isSingin)
        const contElement = document.querySelector('.cont');
        if (contElement) {
            contElement.classList.toggle('s-signup', isSingin);
            isSingin = !isSingin; // Alternando o valor de register após alterar a classe
        }
    };

    async function logar(){
        const user = {
            email: email,
            senha: senha
        }
        try {
            setIsLoading(true);
            const response =  await UserService().login(user);
            console.log(response);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
        
    }

    return (
        <div id="container-login">
            <div className='cont'>
                <div className="form sign-in">
                    <h2>LOGIN</h2>
                    <div className='sign-in-content'>
                        <FloatLabel label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <FloatLabel label="Senha" name="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        <div className="forgot-pass"><a>Esqueci minha senha</a></div>
                        <span className="m-up">Não possui uma conta? <a className='loginCad' onClick={alterLoginRegister}>Cadastre-se</a></span>
                        <SubmitButton label="Login" onClick={logar} />
                    </div>
                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img-logo">Logo</div>
                        <div className="img-text">
                            <p>Faça login facilmente!</p>
                            <div className='singin-social-media'>
                                <a style={{ paddingTop: 8 + 'px' }}><FaFacebookSquare size={40}
                                    color='blue' /></a>
                                <a style={{ paddingTop: 8 + 'px' }}><FcGoogle size={40} /></a>
                                <a><FaApple size={40} /></a></div>
                        </div>
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
                        <span className="m-in">Possui uma conta?<a className='loginCad' onClick={alterLoginRegister}>Faça login</a></span>
                        <button type="button" className="submit" >Sign Up Now</button>
                    </div>

                </div>
                {/* <div className="img-btn" onClick={alterLoginRegister}>
                            <span className="m-up">Não possui uma conta? <button className='loginCad' onClick={alterLoginRegister}>Cadastre-se</button></span>
                            <span className="m-in">Possui uma conta?<a className='loginCad' onClick={alterLoginRegister}>Faça login</a></span>
                </div> */}
            </div>
        </div>
    );
}