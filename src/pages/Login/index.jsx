import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.scss'
import { useState, useContext } from 'react';
import FloatLabel from '../../components/FloatLabel';
import SubmitButton from '../../components/SubmitButton';
import { FaFacebookSquare, FaApple } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import {loginUser, createUser} from '../../api/user';
import { AuthContext } from '../../auth/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    var isSingin = true;

    const alterLoginRegister = () => {
        const contElement = document.querySelector('.cont');
        if (contElement) {
            contElement.classList.toggle('s-signup', isSingin);
            isSingin = !isSingin;
        }
    };

    const limparFormulario = () => {
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
    }

    const logar = async () => {
        try {
            setIsLoading(true);
            const response = await loginUser(email, password)
            if(response && response.data) {
                navigate('/')
                login(response.data.mensagem);
                limparFormulario();
            }
        } catch (error) {
            toast(error.response.data.mensagem);
        } finally {
            setIsLoading(false);
        }
    }

    const criarConta = async () => {
        const user = {
            name: name,
            email: email,
            phone: phone,
            password: password
        }
        try {
            setIsLoading(true);
            const response = await createUser(user);
             if(response.status === 201){
                toast('Usuário cadastrado com sucesso!')
                logar()
             }
        } catch (error) {
            console.log(error)
            toast(error)
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
                        <FloatLabel label="Senha" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="forgot-pass">
                            <Link to="/resetpassword">Esqueci minha senha</Link>
                        </div>
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
                                <a style={{ paddingTop: 8 + 'px' }}><FaFacebookSquare size={30}
                                    color='blue' /></a>
                                <a style={{ paddingTop: 8 + 'px' }}><FcGoogle size={30} /></a>
                                <a><FaApple size={30} /></a></div>
                        </div>
                    </div>
                    <div className="form sign-up">
                        <h2>CADASTRO</h2>
                        <div className='sign-in-content'>
                            <FloatLabel label="Nome" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <FloatLabel label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <FloatLabel label="Telefone" name="phone" type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <FloatLabel label="Senha" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span className="m-up">Já possui uma conta? <a className='loginCad' onClick={alterLoginRegister}>Login</a></span>
                            <SubmitButton label="Criar" onClick={criarConta} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
