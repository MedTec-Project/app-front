export default function ModalRegister() {
    return (
        <div className="modal-register">
            <div className="modal-register-content">
                <div className="modal-register-header">
                    <h2>Cadastro</h2>
                    <button className="close-btn"><img
                        src="https://cdn.iconscout.com/icon/free/png-256/close-4928325-1624245.png" alt="Fechar"/>
                    </button>
                </div>
                <div className="modal-register-form">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" id="name" placeholder="Nome"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" placeholder="Senha"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirmar Senha</label>
                            <input type="password" id="confirm-password" placeholder="Confirmar Senha"/>
                        </div>
                    </form>
                </div>
                <div className="modal-register-footer">
                    <button className="register-btn">Cadastrar</button>
                </div>
            </div>
        </div>
    );
}