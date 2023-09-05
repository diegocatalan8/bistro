class APIUtility {

    static #getRequest(method, data){
      
      let requestObject;
      if(data instanceof FormData){
        requestObject = {
          method: method,
          body: data
        }
      } else {
        requestObject = {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      }
      return requestObject;
    }

    static async fetchData(url) {
      try {
        //PETICION
        const response = await fetch(url);
        const data = await response.json();
        //VALIDACION
        if (response.status === 200) {
          console.log('Petición exitosa');
          return data;
        } 
        else if (response.status === 404) {
          throw new Error('No se encontraron datos en la API');
        } 
        else {
          throw new Error('Error en la petición');
        }

      } 
      catch{
        throw new Error('Upss, Error');
      }
    
    }

    static async postData(url, requestData) {
      try {
        const request = this.#getRequest('POST', requestData);
        //PETICION
        const response = await fetch(url, request);
        const data = await response.json();
        //VALIDACION
        if (response.ok) {
          console.log('Petición exitosa');
          return data;
        } 
        else if (response.status === 404) {
          throw new Error('No se encontraron datos en la API');
        } 
        else {
          throw new Error('Error en la petición');
        }
      } 
      
      catch (error) {
        throw new Error('Upss, Error');
        
      }
    }

    static async putData(url, requestData) {
      try {
        const request = this.#getRequest('PUT', requestData);
        //PETICION
        const response = await fetch(url, request);
        const data = await response.json();
        //VALIDACIONES
        if (response.status === 200) {
          console.log('Petición exitosa');
          return data;
        } 
        else if (response.status === 404) {
          throw new Error('No se encontraron datos en la API');
          
        } 
        else {
          throw new Error('Error en la petición');
        }
      } 
      
      catch (error) {
        throw new Error('Ups, ocurrió un error');
      }
    }

}

export default APIUtility;