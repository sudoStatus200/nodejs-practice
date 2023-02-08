const projects = require('./data-store');
const url  =  require("url");
const http = require("http");
const PORT = 8000;
const  server = http.createServer((request, response)=>{
  response.setHeader("Content-Type", "application/json");

  const pathName = url.parse(request.url, true).pathname
  
  const pathParts = pathName.split("/")

  if(request.method === 'GET' && pathParts[1] === "projects" &&  pathParts.length ===  3){
    const projectId = pathParts[2]
    
    if(!projectId || isNaN(+projectId)){
      response.statusCode = 400;
      response.end(JSON.stringify({"message": "BAD REQUEST"}));      
      return 
    }

    const result = projects.filter(({id})=> id === +pathParts[2])
    
    if(result.length === 0){
      response.statusCode = 404;
      response.end(JSON.stringify({"message": "Resource not found"}));      
      return
    }

    response.statusCode = 200;
    response.end(JSON.stringify(result));
    return
  }


  response.statusCode = 404;
  response.end(JSON.stringify({"message": "Route Not found"}));  

});


server.listen(PORT, (err)=>{
  if(err){
    return console.log(err);
  }
  console.log(`Server nis listening at port ${PORT}`);
})

module.exports = server;
