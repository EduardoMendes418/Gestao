import React, { useState, useEffect } from 'react';
import useApi from '../services/api';
import {useHistory} from 'react-router-dom';
import {TheContent,TheSidebar,TheFooter,} from './index';

const TheLayout = () => {
//minha api service/ impornts  
const api = useApi();  
const history = useHistory();
const [loading, setLoading] = useState(true);

//********  PROCESSO DE VERIFICACAO DE LOGIN ************* 
useEffect(()=>{
  const checkLogin = async () => {
    if(api.getToken()){
      //se estiver token prcisa validar
      const result = await api.validateToken();
      if(result.error === ''){
        setLoading(false);
      }else {
        //se tiver algum problema no token  
        alert(result.error);
        history.push('/login');
      }
    } else {
      //se nao estiver logado
      history.push('/login');
    }
  }
  checkLogin();
},[]);

  return (
    <div className="c-app c-default-layout">
      {!loading &&
      <>
      <TheSidebar/>
      <div className="c-wrapper">
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
      </>
      }
    </div>
  )
}

export default TheLayout;
