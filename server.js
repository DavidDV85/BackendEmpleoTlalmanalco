const c = console.log,
app = require('./app')
dbsql = require('./models/dbsql')

app.listen(
  app.get('port'),
  () => c(`Iniciando API RESTfull en el puerto ${app.get('port')}`)
)
c(
  '***** VARIABLES DE ENTORNO *****\n',
  process.env.NODE_ENV,
  '\n',
  process.env.PORT,
  '\n***** VARIABLES DE ENTORNO *****'
)