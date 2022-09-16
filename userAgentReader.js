import fs from 'fs';
import readLine from 'readline'

/**
 * @param fReadName 文件名路径
 * @param cb 回调函数
 * @return 随机字符串 user agent
 */
export const readFileToArr = (cb, fReadName = 'userAgent.txt') => {
    const arr = [];
    const readObj = readLine.createInterface({
      input: fs.createReadStream(fReadName)
    });
    readObj.on('line', function (line) {
      arr.push(line);
    });
    readObj.on('close', function () {
      const draftAgent = arr[random(0, arr.length)]
      cb(draftAgent);
    }); 
}

const random = (min,max) =>{
  if(min > max){
      var ls = min;
      min = max;
      max = ls;
  }
  return Math.floor(Math.random() * (max-min+1) ) + min;
}
