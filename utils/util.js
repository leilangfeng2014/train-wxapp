
function getPlatform(cb) {
  wx.getStorage({
    key: 'platform',
    success: function(res) {
      typeof cb == "function" && cb(res.data);
    },
    fail: function() {
      wx.getSystemInfo({
        success: function(res) {
          wx.setStorage({key:"platform", data:res.platform});
          typeof cb == "function" && cb(res.platform);
        }
      });
    }
  });
}

function imgResize(url, width, height, isCrop, quality) {
  var modeType = 3;
  if(isCrop){
      modeType = 1;
  }
  var qVal = 80;
  if(quality){
      qVal = quality;
  }
  return ImgDomain + url + '?imageView2/'+ modeType +'/w/'+width+'/h/'+height+'/interlace/1/q/'+ qVal +'/format/jpg';
}

function combineUrl(url) {
  return ImgDomain + url;
}

function findCity(id) {
  var mainCities = City.cities.groups[0].regions;
  var allCities = City.cities.groups[0].groups;

  var city = {};
  var hasFind = false;
  mainCities.forEach(function(c) {
    if(c.id == id){
      hasFind = true;
      city = c;
      return false;
    }
  });

  if(!hasFind){
    var regions = [];
    allCities.forEach(function(provinces) {
      provinces.regions.forEach(function(r) {
        regions.push(r);
      });
    });
    regions.forEach(function(c) {
      if(c.id == id){
        hasFind = true;
        city = c;
        return false;
      }
    });
  }

  if(hasFind){
    return city;
  }
  return undefined;
}

function findObject(array, filterObj) {
  var filterKey = Object.keys(filterObj)[0];
  var obj = {};
  var hasFind = false;
  array.forEach(function(item) {
    if(item[filterKey] == filterObj[filterKey]){
      obj = item;
      hasFind = true;
      return false;
    }
  });
  if(hasFind){
    return obj;
  }
  return undefined;
}

function drawCicle(a, b, w, h, id) {
  if(!b || b === 0) {
    b = 1;
  }
  if(!a){
    var cxt_arc = wx.createCanvasContext(id);//创建并返回绘图上下文context对象。
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#FFFFFF');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(w/2, h/2, w/2-4, 0, 2*Math.PI, false);//设置一个原点(45,46)，半径为100的圆的路径到当前路径
    cxt_arc.stroke();//对当前路径进行描边

  }else{
    var cxt_arc = wx.createCanvasContext(id);//创建并返回绘图上下文context对象。
    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#FFFFFF');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(w/2, h/2, w/2-4, 0, 2*Math.PI, false);//设置一个原点(45,46)，半径为100的圆的路径到当前路径
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.setLineWidth(8);
    cxt_arc.setStrokeStyle('#0083FF');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(w/2, h/2, (w/2-4), 0, 2*Math.PI*a/b, false);
    cxt_arc.stroke();//对当前路径进行描边
  }

  cxt_arc.draw();

}

module.exports = {
  imgResize: imgResize,
  combineUrl: combineUrl,
  findCity: findCity,
  findObject: findObject,
  getPlatform: getPlatform,
  drawCicle: drawCicle
}
