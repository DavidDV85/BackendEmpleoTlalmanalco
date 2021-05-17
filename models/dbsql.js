const Sequelize = require('sequelize'),
c = console.log
let sequelize, db

class DataBase{
  constructor (){
    this.connect()
  }
  connect(){
    const server= `${process.env.SQLSERVER}` //:${process.env.SQLPORT}
    sequelize = new Sequelize(process.env.SQLDB, null, null, {
      host: process.env.SQLSERVER,
      port: process.env.SQLPORT,
      dialect: 'mssql',
      dialectOptions: {
        authentication: {
          type: 'default',
          options: {
            userName: process.env.SQLUSER,
            password: process.env.SQLPASS
          }
        },
        // Observe the need for this nested `options` field for MSSQL
        options: {
          // Your tedious options here
          encrypt:false,
          useUTC: false,
          dateFirst: 1,
          appName: 'ApiConorafEmpleo',
          rowCollectionOnDone: true,
          useColumnNames: false,
          enableArithAbort:false,
          tdsVersion: '7_4',
          validateBulkLoadParameters: true
        }
      }
    })
    sequelize.authenticate()
    .then( (err) => {
      c('Conexion SQL exitosa.');
    })
    .catch( (err) => {
      c('Unable to connect to the SQL database:', err);
    })
  }
  /*spSolicitud = async (query, params, req,res) => {
    await sequelize.query(query, params)
    .then((resultValues) => { 
      const idSolicitud = resultValues[0][0].IdSolicitud
      c(`resultValues ${JSON.stringify(resultValues[0] ,'utf-8')} val ${idSolicitud}`); 
      
    })
    .catch((error) => { console.log('Error', error); });
  }*/
}

db=new DataBase()
module.exports= {
  sequelize,
  db
} 