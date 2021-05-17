const QueryTypes = require('sequelize'),
ErrorInfo = require('./error'),
c=console.log

const getListaColoniaMovil = async (req,res) => {
    if(req.body.Estado && req.body.idDispositivo){
        if(req.body.Estado > 0 && req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_COLONIA_MUNI_EDO :param1, :param2, :param3;'
			const parametros={ 'replacements': { 
                'param1': req.body.Estado, 'param2': req.body.idDispositivo, 'param3': req.ip }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ total: resultado.length } ,'utf-8')} `); 
                    res.status(200).send( resultValues[0] );
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
const getListaColoniaMuniMovil = async (req,res) => {
    if(req.body.Municipio && req.body.idDispositivo){
        if(req.body.Municipio > 0 && req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_COLONIA_MUNI :param1, :param2, :param3;'
			const parametros={ 'replacements': { 
                'param1': req.body.Municipio, 'param2': req.body.idDispositivo, 'param3': req.ip }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ total: resultado.length } ,'utf-8')} `); 
                    res.status(200).send( resultValues[0] );
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
const getListaMunicipioMovil = async (req,res) => {
    if(req.body.Estado && req.body.idDispositivo){
        if(req.body.Estado > 0 && req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_MUNICIPIO_ESTADO :param1, :param2, :param3;'
			const parametros={ 'replacements': { 
                'param1': req.body.Estado, 'param2': req.body.idDispositivo, 'param3': req.ip }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ total: resultado.length } ,'utf-8')} `); 
                    res.status(200).send( resultValues[0] );
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
const getListaEstadoMovil = async (req,res) => {
    if(req.body.idDispositivo){
        if(req.body.idDispositivo.length > 10 ){
            let query='EXEC APIMOV_ESTADO :param1, :param2;'
			const parametros={ 'replacements': { 'param1': req.body.idDispositivo, 'param2': req.ip }, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const resultado = resultValues[0]
                if(resultado.length < 1 ){
                    ErrorInfo.setError(res, 204,'Datos Incorrectos', resultado, null)
                } else {
                    c(`resultValues ${JSON.stringify({ total: resultado.length } ,'utf-8')} `); 
                    res.status(200).send( resultValues[0] );
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
    getListaColoniaMovil:getListaColoniaMovil,
    getListaColoniaMuniMovil:getListaColoniaMuniMovil,
    getListaMunicipioMovil:getListaMunicipioMovil,
    getListaEstadoMovil:getListaEstadoMovil
}