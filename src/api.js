const makeGet = (url, options = {}) =>{
    const headers = options['headers'] || {};
    const params = options['params'] || {}
    const query =Object.keys(params).map(k => encodeURIComponent(k) + '=' +
    encodeURIComponent(params[k])).join('&')
    //const urlFinal = url+ '?' +query
    console.log("url;", url);
    return fetch(url, { headers,method: 'GET'}).then(res => res.json());
};

const makePost = (url,object={}, options = {}) => {
    const headers = options['headers'] || {};
    const body = JSON.stringify(object);
    headers['Content-type'] ='application/json';
    return fetch(url, {body, headers, method: 'POST'}).then(res => res.json());
};

const makePut = (url,object = {},options = {}) => {//url debe incluir /id en el endpoint
    const headers = options['headers'] || {};
    const body = JSON.stringify(object);
    headers['Content-type'] ='application/json';
    return fetch(url, {body, headers, method: 'PUT'}).then(res =>res.json());
};

const makeDeleteID = (url, options = {}) => {
    const headers = options['headers'] || {};
    headers['Content-type'] ='application/json';
    return fetch(url, { headers, method: 'DELETE'}).then(res =>res.json());
};

export const fetchRegistro = (id) =>{
    const url ="http://localhost:9000/api/taxis/"+id+"/";
    const headers = {'Content-type': 'application/json'};
    const params ={}
    return makeGet (url,{params,headers});
}

export const fetchCrearRegistro = ( unique_key, taxi_id, company, trip_total )=>{
    const url ="http://localhost:9000/api/taxis/";
    const headers = {'Content-type': 'application/json'};
    const objeto = {
        unique_key: unique_key,
        taxi_id: taxi_id,
        company: company,
        trip_total: trip_total,  
    };
    return makePost (url,objeto,{headers});
}

export const fetchUpdateRegistro = (_id, unique_key, taxi_id, company, trip_total)=>{
    const url ="http://localhost:9000/api/taxis/"+_id+'/';
    const headers = {'Content-type': 'text/plain'};
    const objeto = {
        unique_key: unique_key,
        taxi_id: taxi_id,
        company: company,
        trip_total: trip_total,
        
    };
    return makePut (url,objeto,{headers});
}
export const fetchEliminarRegistro = (_id)=>{
    const url ="http://localhost:9000/api/taxis/"+_id+'/';
    const headers = {'Content-type': 'text/plain'};
    return makeDeleteID (url,{headers});
}