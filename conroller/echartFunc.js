const echarts = require('echarts');
const siyuanSql = require('../siyuanApi/siyuanSql')
const chartCss = require('../css/chartCss')
// 得到前360天的每个日期
function getBeforeDate(n) {
    var date = new Date();
    var year, month, day;
    date.setDate(date.getDate() - n);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
}

function getDateList(dataList) {
    // 定义一个结果数组
    let result = [];

    // 定义一个对象或Map来存储每个日期在结果数组中的索引
    let indexMap = {};

    // 获取当前日期
    let today = new Date();

    // 遍历前360天，将每个日期添加到结果数组和索引对象或Map中
    for (let i = 0; i <= 360; i++) {
        // 获取前i天的日期字符串，例如"2023-02-01"
        let dateStr = new Date(today.getTime() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

        // 将日期字符串和初始值0作为一个元素添加到结果数组中
        result.push([dateStr, 0]);

        // 将日期字符串和对应的索引添加到索引对象或Map中
        indexMap[dateStr] = i;
    }
    // 遍历数据列表，将每个对象的created属性值转换为日期格式，并更新结果数组中对应元素的第二个值
    for (let obj of dataList) {
        // 转换日期格式，例如"2023-02-01"
        let date = obj.created.slice(0, 4) + "-" + obj.created.slice(4, 6) + "-" + obj.created.slice(6, 8);

        // 获取该日期在结果数组中的索引
        let index = indexMap[date];

        // 如果该索引存在，则增加结果数组中对应元素的第二个值
        if (index !== undefined) {
            result[index][1]++;
        }
    }
    return result;
}

function show(newDiv) {
    chartCss.setcss(newDiv)
    //{locale:'ZH'}：使用echarts的中文编码
    const myChart = echarts.init(newDiv, null, { locale: 'ZH' });
    let option;
    option = {
        //鼠标移入图时，通过hover效果显示每一天的日期和活跃度
        tooltip: {
            formatter(params) {
                return `${params.data[0]},` + `\n` + `
                活跃度：${params.data[1]}`;
            },
        },
        visualMap: {
            //是否显示图上面的示例
            show: false,
            min: 0,
            max: 400,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 10,
            pieces: [      // 自定义每一段的范围，以及每一段的文字
                { gte: 15, color: 'blue' }, // 不指定 max，表示 max 为无限大（Infinity）。
                { gte: 5, lte: 10, color: 'rgb(98,155,223)' },
                { gte: 3, lte: 5, color: 'rgb(167,213,255)' },
                { gte: 1, lte: 3, color: 'rgb(214,233,250)' },
                { lte: 0, color: 'rgb(238,238,238)' }],
        },
        calendar: {
            top: 40,
            left: 30,
            right: 30,
            width: 800,
            height: 115,
            cellSize: 25,
            splitLine: false,
            range: [getBeforeDate(365), getBeforeDate(0)],
            itemStyle: {
                borderWidth: 0.5,
                borderColor: 'black',
                normal: {
                    borderWidth: 3,
                    borderColor: 'rgb(255, 255, 255)'
                }
            },
            yearLabel: { show: false }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: []
        }
    };
    option && myChart.setOption(option);
    
    myChart.showLoading();
    siyuanSql.getData().then((data) => {
        myChart.hideLoading();
        option.series.data = getDateList(data);
        myChart.setOption(option);
    });
}

module.exports.show = show