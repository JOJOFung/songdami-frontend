const server_addr = "https://www.guilongmihang.cn";
const order_path_create = "/";

function getOrderCreateURL(){
  return server_addr + order_path_create;
}

module.exports = {
  getOrderCreateURL: getOrderCreateURL
}