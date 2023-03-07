function timeToStr(time){
    let str = time.getFullYear();
    let month = time.getMonth()+1;
    if(month<10){
        str += "0"+month;
    }else{
        str += month;
    }
    let date = time.getDate();
    if(date<10){
        str += "0"+date;
    }else{
        str += date;
    }
    return str+"000000";
}
function getData(year) {
    try {
        // 定义一个dataList数组
        let dataList = [];
        // 判断siyuan是否存在
        if (siyuan) {
            // 使用async/await来处理异步操作
            return (async () => {
                // 获取总数
                let firstDay = new Date(year, 0, 1);
                let lastDay = new Date(+year+1, 0, 1);
                let firstDayStr = timeToStr(firstDay);
                let lastDayStr = timeToStr(lastDay);
                let count = await siyuan.serverApi.sql(`SELECT count(*) from blocks WHERE type='d' AND created>= '${firstDayStr}' And created<'${lastDayStr}'`);
                console.log(`SELECT count(*) from blocks WHERE type='d' AND created>= '${firstDayStr}' And created<'${lastDayStr}'`)
                let size = 50;
                // 定义一个promises数组
                let promises = [];
                console.log("文档总数", count)
                for (let i = 0; i < count[0]['count(*)']; i += size) {
                    // 将每个sql()函数返回的promise添加到promises数组中
                    promises.push(siyuan.serverApi.sql(`SELECT created From blocks WHERE type='d'  AND created>= '${firstDayStr}' And created<'${lastDayStr}' limit ${size} OFFSET ${i}`));
                }
                // 等待所有promise完成，并将结果合并到dataList数组中
                dataList = (await Promise.all(promises)).flat();
                console.log("文档创建时间", dataList)
                return dataList;
            })();
        }
    } catch (err) {
        console.log("加载siyuan失败");
    }
}

module.exports.getData = getData