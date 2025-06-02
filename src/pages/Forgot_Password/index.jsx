import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
import FloatLabel from '../../components/FloatLabel';
import SubmitButton from '../../components/SubmitButton';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            toast.error('Por favor, insira um e-mail válido.');
            return;
        }

        try {
            setIsLoading(true);
            setTimeout(() => {
                toast.success('Um link para redefinir sua senha foi enviado ao seu e-mail.');
                setIsLoading(false);
            }, 2000);
        } catch (error) {
            toast.error('Erro ao tentar redefinir a senha. Tente novamente.');
            setIsLoading(false);
        }
    };

    return (
        <div id="container-reset-password">
                    <div className="image-container">
            <div className="reset-card">
                <h2>Esqueci minha senha</h2>
                <p>Enviaremos a você por e-mail um link que poderá redefinir sua senha se você tiver problemas para fazer login.</p>
                <FloatLabel label="E-mail" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <SubmitButton label="ENVIAR" onClick={handleResetPassword} isLoading={isLoading} />
                <Link className='Link' to="/login">Cancelar</Link>
            </div>
        </div>
    </div>
    );
}