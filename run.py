# 导入os模块
import os
import shutil
def insertContent():
    # 打开文件A和文件B
    pathA = "/mnt/d/jetaime/softdocument/siyuanWokerSpace/software/data/plugins/mytest/main.js"
    pathB = os.path.join(".", "build", "main.js")
    with open(pathA, "r+") as fileA, open(pathB, "r+") as fileB:
      # Read the first 31 lines of fileA and delete the rest
      linesA = fileA.readlines()[:31]
      fileA.seek(0)
      fileA.truncate()
      fileA.writelines(linesA)

      linesB = fileB.readlines()[1:]
      # 读取文件B的全部内容，并删除前5个字符
      contentB = linesB[0][5:]
      # 在前面添加function myshow()
      contentB = "function myshow()" + contentB
      # 删除最后4个字符
      contentB = contentB[:-4]
      
    # 将文件B的内容加到文件A的31行后
    with open(pathA, "a") as fileA:
        fileA.write(contentB)
# 获取当前操作系统的名称
system = os.name

# 根据不同的系统，选择不同的命令行工具
if system == "nt": # Windows系统
  cmd = "cmd"
elif system == "posix": # Linux或MacOS系统
  cmd = "bash"
else: # 其他系统
  print("Unsupported system.")
  exit()

status = os.system(f"{cmd} -c 'yarn run build'")
# 判断状态码是否为0
if status == 0:
  print("打包成功")
  insertContent()
else:
  print("Command failed with status code:", status)