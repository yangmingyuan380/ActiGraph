const echartFunc = require('./conroller/echartFunc');
if(siyuan){
    new siyuan.Dialog({
        title: '活跃图',
        content: `
        <div>
          <select id="plugin-chartyear">
          </select>
          <div id="plugin-chart">
          </div>
        </div>
        `,
        width: '70vw',
        height: '50vh',
    });
    setTimeout(() => {
        // 年份选择器
        let selectEl = document.getElementById('plugin-chartyear');
        var currentYear = new Date().getFullYear();
        let defultOption = new Option(currentYear, currentYear, true);
        selectEl.add(defultOption); // 默认选择
        // 选择器添加选项
        for (var i = 2000; i < currentYear; i++) {
            let newOption = new Option(i, i);
            selectEl.add(newOption);
        }
        let chartEl = document.getElementById('plugin-chart');
        echartFunc.show(chartEl,selectEl.value);
        selectEl.onchange = ()=>{
            echartFunc.show(chartEl,selectEl.value);
        }
    })
}
