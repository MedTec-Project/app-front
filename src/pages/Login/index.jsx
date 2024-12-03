import React from 'react';
import './LoginForm.scss'
import { useState, useContext } from 'react';
import FloatLabel from '../../components/FloatLabel';
import SubmitButton from '../../components/SubmitButton';
import { FaFacebookSquare, FaApple } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import {loginUser, createUser} from '../../api/user';
import { AuthContext } from '../../auth/Context';
import { toast } from 'react-toastify';

export default function Login() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

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

    const limparFormulario = () => {
        setEmail('');
        setSenha('');
        setNome('');
        setTelefone('');
    }

    async function logar() {
        try {
            setIsLoading(true);
            const response = await loginUser(email, senha)
            if(response.token){
                login(response.token);
            }
        } catch (error) {
            toast(error);
        } finally {
            setIsLoading(false);
        }
        limparFormulario();
    }

    async function criarConta() {
        const user = {
            nome: nome,
            email: email,
            telefone: telefone,
            senha: senha
        }
        try {
            setIsLoading(true);
            const response = await createUser(user);
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
                        <div className='sign-in-content'>
                            <FloatLabel label="Nome" name="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <FloatLabel label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <FloatLabel label="Telefone" name="telefone" type="phone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                            <FloatLabel label="Senha" name="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <span className="m-up">Já possui uma conta? <a className='loginCad' onClick={alterLoginRegister}>Login</a></span>
                            <SubmitButton label="Criar" onClick={criarConta} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}