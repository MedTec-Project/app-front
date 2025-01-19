const api = 'http://localhost:9000/api';

export default function UserService(){
    
   async function login(user){
        return await fetch(`${api}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Acess-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Login inválido');
        })
    }
    
    return {
        login
    }
}