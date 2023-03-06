
function setcss(chartDiv) {
    // 为新建的div元素设置id和class属性
    chartDiv.setAttribute('id', 'chart');
    chartDiv.setAttribute('class', 'echarts');
    chartDiv.style.width = "1000px";
    chartDiv.style.height = "300px";
    chartDiv.style.border = "solid 1px black";
    chartDiv.style.border = "solid 1px black";
    // 浮动在上层
    chartDiv.style.position = "fixed";
    chartDiv.style.top = 0;
}

module.exports = { setcss }