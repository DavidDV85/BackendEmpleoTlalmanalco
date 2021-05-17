const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación de API REST ANDROID",
      version: "1.0.1",
      description:
        "Documentación y uso de APIREST para registro y consulta de registros.",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "SISTEMAS TRESNET",
        url: "http://www.tresnet.com.mx",
        email: "david.duran@tresnet.com.mx"
      }
    },
    servers: [
      {
        url: "http://157.245.188.131:3000/api",
        description: "ANDROID API",
      }
    ]
  },
  components:[{
    securitySchemes:[{
      ApiKeyAuth: [{
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header" ,
        name: "key",
        description: "Prueba KEY"
      }]
      
    }]
    
  }],

  
  apis: ["./routes/Models/Error-Mensaje-res.js", "./routes/Models/Error-Token-res.js","./routes/Models/Error-res.js","./routes/Models/SolitToken.js", "./routes/Models/Token.js", 
  "./routes/Models/PaquetePost.js", "./routes/Models/PaquetePost-res.js", "./routes/Models/PaquetePut.js", "./routes/Models/PaquetePut-res.js", 
  , "./routes/Models/PaqueteDelete.js", "./routes/Models/PaqueteDelete-res.js","./routes/index.js"]
};

module.exports = options