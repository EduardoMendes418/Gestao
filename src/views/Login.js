import React, { useState } from 'react';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import useApi from '../services/api';
import { useHistory } from 'react-router-dom';

const Login = () => {

  const api = useApi(); //Chamando Api server
  const history = useHistory();
  
  const [email, setEmail] = useState(''); //Email e Login
  const [password, setPassword] = useState('');//Email e Login
  const [error, setError] = useState('');//Salvar quanto tiver um error
  const [loading, setLoading] = useState(false); //Login assim q ativar

  //REQUISIÇÃO DO LOGIN
  const  handleLoginButton = async () => {
    if(email && password){
      setLoading(true);
        const result = await api.login( email, password);     
      setLoading(false);
      //salvando dados e direcionando para dashboard
      if(result.error ===''){
        localStorage.setItem('token',result.token);
        history.push('/');
      }
      //error no Login
      else{
        setError(result.error);
      }
    }else{
      setError("Digite os dados");
    }
  }
  
  //FORMULARIO DE LOGIN 
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Digite seus dados de acesso</p> 
                   
                     {/*Error*/}
                     {error !== '' &&
                      <CAlert color="danger">{error}</CAlert> 
                    }
                    
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      {/*Email*/}
                      <CInput 
                      type="text" 
                      placeholder="E-mail" 
                      value={email} 
                      onChange={e=>setEmail(e.target.value)}
                      disabled = {loading} 
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      {/* Password*/}
                      <CInput 
                      type="password" 
                      placeholder="Senha" 
                      value={password}
                      onChange={e=>setPassword(e.target.value)} 
                      disabled = {loading}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs="6">
                        <CButton 
                        color="primary" 
                        className="px-4"
                        onClick={handleLoginButton}
                        disabled = {loading}
                        >
                         {/*carregar no proprio btn*/}
                         {loading ? 'Carregando' : 'Entrar'}  
                        </CButton>
                      </CCol>
                    </CRow>

                  </CForm>
                </CCardBody>
              </CCard>
            
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

//suporte@b7web.com.br
//senha:1234