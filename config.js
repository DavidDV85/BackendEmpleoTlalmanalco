process.env.NODE_ENV= 'produccion'
//process.env.NODE_ENV= process.env.NODE_ENV || 'dev'
process.env.PORT = process.env.PORT || 5002

//if( process.env.NODE_ENV === 'dev'){
 
  process.env.SQLUSER='AndEmpTlallUser'
  process.env.SQLPASS='21PoderLobo'
  process.env.SQLSERVER='82.223.202.32' //82.223.202.32
  process.env.SQLPORT='1433'
  process.env.SQLDB='DADUVA_EMPLEO_TLALMANALCO' 
//} else {
  /*process.env.SQLUSER='sa'
  process.env.SQLPASS='3netAdmin'
  process.env.SQLSERVER='157.245.162.55'
  process.env.SQLPORT='1433'
  process.env.SQLDB='SKYMEX_API'*/
//}