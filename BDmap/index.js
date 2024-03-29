var map = new BMap.Map("map");
var point = new BMap.Point(116.400244,39.92556)
map.centerAndZoom(point, 12);
map.enableScrollWheelZoom()
var newimg = new BMap.Icon("https://i.i8tq.com/oxygenbar/l.png", new BMap.Size(50,50))

var marker = new BMap.Marker(new BMap.Point(116.400344,39.94556), {icon: newimg});  // 创建标注
map.addOverlay(marker);              // 将标注添加到地图中
marker.addEventListener("click",getAttr);
function getAttr(){
  map.addOverlay(mySquare);
  var p = marker.getPosition();       //获取marker的位置
  alert("marker的位置是" + p.lng + "," + p.lat);
}
$('#closemarker').on('click', function(){
  var allOverlay = map.getOverlays();
  console.log(allOverlay)
  map.removeOverlay(allOverlay[0]);
})

// 定义自定义覆盖物的构造函数
function SquareOverlay(center, length, color){
    this._center = center;
    this._length = length;
    this._color = color;
}
// 继承API的BMap.Overlay
SquareOverlay.prototype = new BMap.Overlay();
// 实现初始化方法
SquareOverlay.prototype.initialize = function(map){
    // 保存map对象实例
    this._map = map;
    // 创建div元素，作为自定义覆盖物的容器
    var div = document.createElement("div");
    div.style.position = "absolute";
    // 可以根据参数设置元素外观
    div.style.width = this._length + "px";
    div.style.height = this._length + "px";
    div.style.background = this._color;
    div.innerHTML='<span id="ceshi">测试</span>'
    // 将div添加到覆盖物容器中
    map.getPanes().markerPane.appendChild(div);
    // 保存div实例
    this._div = div;
    // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
    // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
    return div;
}
// 实现绘制方法
SquareOverlay.prototype.draw = function(){
// 根据地理坐标转换为像素坐标，并设置给容器
    var position = this._map.pointToOverlayPixel(new BMap.Point(116.500344,39.94556));
    this._div.style.left = position.x - this._length / 2 + "px";
    this._div.style.top = position.y - this._length / 2 + "px";
}
var mySquare = new SquareOverlay(map.getCenter(), 100, "red");
map.setMapType(BMAP_HYBRID_MAP);
