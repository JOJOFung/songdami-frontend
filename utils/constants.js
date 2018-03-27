const server_addr = "http://123.206.189.119";
const server_port = "3000";
const order_path_create = "/";

function getOrderCreateURL(){
  return server_addr + ":" + server_port + order_path_create;
}

module.exports = {
  getOrderCreateURL: getOrderCreateURL
}