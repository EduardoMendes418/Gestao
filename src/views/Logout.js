import { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import useApi from '../services/api';

//TELA DE LOGOUT DA DASH  
export default () => {
    //chamando 
    const api = useApi();
    const history = useHistory();

    //Sair na dashboard e direcionando para pagina Login    
    useEffect(() => {
        const doLogout = async () => {
            await api.logout();
            history.push('/login');
        }        
        doLogout();
    }, []);

    return null;
}