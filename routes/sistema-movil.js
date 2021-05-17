const Token = require('./token'),
QueryTypes = require('sequelize'),
ErrorInfo = require('./error'),
c=console.log

const ConfigInicio = async (req,res) => {
    if(req.body.idDispositivo ){
        if(req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_CONFIG_SISTEMA :param1, :param2;' //
			const parametros={ 'replacements': { 'param1': req.body.idDispositivo, 'param2': req.ip}, 'type': QueryTypes.SELECT } //
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const registros = resultValues[0].length
                c(`resultValues val ${registros}`); 
                if(registros <= 0 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', "", null)
                } else {
                    res.status(200).send(resultValues[0]);
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        } else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', "Verifica los datos.", null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const ConfigInicioAdmin = async (req,res) => {
    if(req.body.idDispositivo ){
        if(req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_CONFIG_SISTEMA_ADMIN :param1, :param2;' //
			const parametros={ 'replacements': { 'param1': req.body.idDispositivo, 'param2': req.ip}, 'type': QueryTypes.SELECT } //
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const registros = resultValues[0].length
                c(`resultValues val ${registros}`); 
                if(registros <= 0 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', "", null)
                } else {
                    res.status(200).send(resultValues[0]);
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        } else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', "Verifica los datos.", null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const ConfigFecha = async (req,res) => {
    if(req.body.idDispositivo){
        if(req.body.idDispositivo.length >= 10 ){
            let query='EXEC APIMOV_FECHA_SRV :param1, :param2;'
			const parametros={ 'replacements': {  'param1': req.body.idDispositivo, 'param2': req.ip}, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Sin Registros', 'Sin Registros', null)
                } else {
                    c(`resultValues ${JSON.stringify({ recibi: resultValues[0] } ,'utf-8')} `); 
                    if(resultado[0].FechaActual)
                        res.status(200).send({ respuesta: 1, mensaje: resultado[0].FechaActual });
                    else
                        res.status(200).send({ respuesta: resultado[0].resultado, mensaje: resultado[0].Mensaje });
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        }
        else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
const ConfigConexion = async (req,res) => {
    if(req.body.idDispositivo){
        if(req.body.idDispositivo.length >= 10 ){
            let query='EXEC APIMOV_CONEXIONES;'
			const parametros={ 'replacements': {  'param1': req.body.idDispositivo, 'param2': req.ip}, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Sin Registros', 'Sin Registros', null)
                } else {
                    res.status(200).send({ respuesta: 1, mensaje: resultado[0].keyId });
                }
            })
            .catch((error) => { ErrorInfo.setError(res, 500,'', '', error) });
        }
        else {
            ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
        }
    }
    else {
        ErrorInfo.setError(res, 404,'Datos Incorrectos', null, null)
    }
}
module.exports={
    ConfigInicio:ConfigInicio,
    ConfigFecha:ConfigFecha,
    ConfigInicioAdmin:ConfigInicioAdmin,
    ConfigConexion:ConfigConexion
  }