const QueryTypes = require('sequelize'),
c=console.log

const getMunicipios = async (req,res) => {
    if(req.body.estado ){
        c(`PRIMER PASO`); 
        if(req.body.estado > 0 ){
            let query='EXEC QUERY_MUNICIPIO :param1;'
			const parametros={ 'replacements': { 'param1': req.body.estado}, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                c(`GETMuni Result ${JSON.stringify(resultValues,'utf-8')}`); 
                res.status(200).send((resultValues[0])).json()
            })
            .catch((error) => { console.log('Error', error); res.status(500).send({mensaje: error}) });
        }
    }
    else {
        let mensajeError='Datos Incorrectos'
        res.status(404).send({ mensaje: mensajeError, informacion: "" })
    }
}
const postMunicipios = async (req,res) => {
    if(req.body.nombre ){
        if(req.body.nombre.length > 4){
            let query='EXEC UPDATE_MUNICIPIO :param1;'
			const parametros={ 'replacements': { 'param1': req.body.nombre}, 'type': QueryTypes.SELECT }
            dbsql.sequelize.query(query, parametros)
            .then((resultValues) => { 
                const idMunicipio = resultValues[0][0].usuarioId
                c(`Municipio Result ${idMunicipio}`); 
                res.status(200).send({ mensaje:"Exito", id:idMunicipio})
            })
            .catch((error) => { console.log('Error', error); res.status(500).send({mensaje: error}) });
        }
    }
    else {
        let mensajeError='Datos Incorrectos'
        res.status(404).send({ mensaje: mensajeError, informacion: "" })
    }
}
module.exports={
    post:postMunicipios,
    get:getMunicipios
  }