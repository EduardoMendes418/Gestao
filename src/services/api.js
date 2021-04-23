/*********************** SERVICE ********************** */
const baseUrl= 'https://api.b7web.com.br/devcond/api/admin';

const request = async (method, endpoint, params, token = null) => {

    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;
    
    switch(method) {
      case 'get':
        let queryString = new URLSearchParams(params).toString();
        fullUrl += `?${queryString}`;
      break;
      case 'post':
      case 'put':
      case 'delete':
          body = JSON.stringify(params);
      break;
    }

    let headers = {'Content-Type':'application/json'};
    if(token){
        headers.Authorization = `Bearer ${token}`;
}
    let req = await fetch(fullUrl, {method, headers, body});
    let json = await req.json();
    return json;
}


export default () => {
    return {
        
        //******************************** Paginas Avisos  ************************************
        //Pegar Token
       getToken: () => {
            return localStorage.getItem('token');
        },
        //Validar token
        validateToken: async () => {
            let token = localStorage.getItem('token');
            let json = await request ('post', '/auth/validate', {}, token);
            return json;
        },
        //Fazer login
        login: async (email,password) => {
            let json = await request ('post', '/auth/login', {email, password});
            return json;
        }, 
        //Fazer lagout
         logout: async () => {
            let token = localStorage.getItem('token');
            let json = await request ('post', '/auth/logout', {}, token);
            localStorage.removeItem('token');
            return json;
         },   
         //Consultar e pegar Avisos do Mural Pag1
         getWall: async () => {
            let token = localStorage.getItem('token');
            let json = await request('get', '/walls', {}, token);
            return json;
         },
         //Pagina WAll Update no Modal 
         updateWall: async (id, data) => {
            let token = localStorage.getItem('token');
            let json = await request('put', `/wall/${id}`, data, token);
            return json;
         },
         //Add Novo Aviso
         addWall: async(data)=> {
            let token = localStorage.getItem('token');
            let json = await request('post', '/walls', data, token);
            return json;
         },
         //Btn Excluir
         removeWall: async (id) => {
            let token = localStorage.getItem('token');
            let json = await request('delete', `/wall/${id}`, {}, token);
            return json;
         },

         //******************************** Paginas Documentos  ************************************
         //Anexar docs
         getDocumentos: async () => {
            let token = localStorage.getItem('token');
            let json = await request('get', '/docs', {}, token);
            return json;
         },
         
         //Processo de Envio das informações e autenticacao com Imagem 
         addDocument: async ( data) =>{
            let token = localStorage.getItem('token');
            let formData = new FormData();
            formData.append('title', data.title);

            if(data.file){
                formData.append('file', data.file);
            }
            let req = await fetch(`${baseUrl}/docs`,{
                method: 'POST',
                headers:{
                    'Authorization' : `Bearer ${token}`
                },
                body: formData
            });
            //resposta em json
            let json = await req.json();
            return json;
         },

         // Processo de Edição com Imagem 
         updateDocument: async ( id, data) => {
            let token  = localStorage.getItem('token');
            let formData = new FormData();
            formData.append('title', data.title);

            if(data.file){
                formData.append('file', data.file);
            }
            //documento id envio de arquivo
            let req = await fetch( `${baseUrl}/doc/${id}` ,{
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${token}`
                },
                body:formData
            });
            //resposta e, json
            let json = await req.json();
            return json;
         },
        
         //Excluir  docuemntos
         removeDocument: async ( id ) =>{
            let token = localStorage.getItem('token');
            let json = await request('delete', `/doc/${id}`, {}, token);
            return json;
         }

    };
}