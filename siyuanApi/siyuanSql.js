/**
 * 批量获取用户所有文档创建时间
 * @returns 
 */
function getData() {
    try {
        // 定义一个dataList数组
        let dataList = [];
        // 判断siyuan是否存在
        if (siyuan) {
            // 使用async/await来处理异步操作
            return (async () => {
                // 获取总数
                let count = await siyuan.serverApi.sql("SELECT count(*) from blocks WHERE type='d'");
                let size = 50;
                // 定义一个promises数组
                let promises = [];
                console.log("文档总数",count)
                for (let i = 0; i < count[0]['count(*)']; i += size) {
                    // 将每个sql()函数返回的promise添加到promises数组中
                    promises.push(siyuan.serverApi.sql(`SELECT created From blocks WHERE type='d' limit ${size} OFFSET ${i}`));
                }
                // 等待所有promise完成，并将结果合并到dataList数组中
                dataList = (await Promise.all(promises)).flat();
                console.log("文档创建时间",dataList)
                return dataList;
            })();
        }
    } catch (err) {
        console.log("加载siyuan失败");
    }
}

module.exports.getData = getData