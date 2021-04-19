

const baseUrl= 'https://api.b7web.com.br/gestao/pai/admin';

const request = async ( method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch (method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `${queryString}`;
        break;
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);
        break;
    }

    let headers = {'Content-type':'application/json'};
    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    let req = await fetch(fullUrl,{method,body});
    let json = await req.json();
    return json;
}

export default () => {
    return {
        getToken: () => {
            return localStorage.getItem('token');
        },
        validateToken: async () => {
            let token = localStorage.getItem('token');
            let json = await request ('post', '/auth/validate');
            return json;
        },
        login: async (email,password) =>{
            let json = await request ('post', '/auth/login', { email, password});
            return json;
        }        
    };
}