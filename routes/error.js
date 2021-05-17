
const setError = async (res, status,mensajeError, informacionError, error) => {
    if(error){
        console.log(`Error ${error}`);
        res.status(status).send({mensaje: error});
    } else {
        if(!informacionError){
            informacionError=''
        }
      res.status(status).send({ mensaje: mensajeError, informacion: informacionError })
    }
}

module.exports={
    setError:setError
}