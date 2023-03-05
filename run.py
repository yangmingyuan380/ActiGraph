# 导入os模块
import os

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

# 在当前文件夹下执行yarn run build命令
os.system(f"{cmd} -c 'yarn run build'")

# 打开文件A和文件B
paths = "d:\jetaime\softdocument\siyuanWokerSpace\software\data\plugins\mytest\main.js"
with open(paths, "r+") as fileA, open("./build/main.js", "r+") as fileB:
  # 读取文件A的前31行，并删除其余内容
  linesA = fileA.readlines()[:31]
  fileA.seek(0)
  fileA.truncate()
  fileA.writelines(linesA)

  # 读取文件B的全部内容，并删除前5个字符
  contentB = fileB.read()[5:]
  # 在前面添加function myshow()
  contentB = "function myshow()" + contentB
  # 删除最后4个字符
  contentB = contentB[:-4]

# 将文件B的内容加到文件A的31行后
with open("fileA.js", "a") as fileA:
  fileA.write(contentB)