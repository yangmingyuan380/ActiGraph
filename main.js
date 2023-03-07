const echartFunc = require('./conroller/echartFunc');
if(siyuan){
    new siyuan.Dialog({
        title: '活跃图',
        content: '<div id="plugin-chart"></div>',
        width: '90vw',
        height: '70vh',
    });
    setTimeout(() => {
        echartFunc.show(document.getElementById('plugin-chart'))
    })
}
