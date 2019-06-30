const domain = 'http://localhost:8000'; 

const interfaces = {
  // 返回的首页请求的json数据
  homepage: domain + '/api/wx_jddata/homepage',
  
  // 返回的商品的json数据
  productions: domain + '/api/wx_jddata/productions',
  
  // 返回的商品列表的json数据
  productionsList: domain + '/api/wx_jddata/productionsList',

  // 返回的商品详情的json数据
  productionDetail: domain + '/api/wx_jddata/productionDetail'
}

module.exports = interfaces;