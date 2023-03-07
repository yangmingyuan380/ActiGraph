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
        width: '90vw',
        height: '70vh',
    });
    setTimeout(() => {
        let selectEl = document.getElementById('plugin-chartyear');
        var currentYear = new Date().getFullYear();
        let defultOption = new Option(2022, 2022, true);
        selectEl.add(defultOption);
        for (var i = 1900; i < currentYear; i++) {
            let newOption = new Option(i, i);
            selectEl.add(newOption);
        }
        let chartEl = document.getElementById('plugin-chart');
        echartFunc.show(chartEl,selectEl.value);
        // selectEl.onselect = echartFunc.show(chartEl,selectEl.value);
    })
}
