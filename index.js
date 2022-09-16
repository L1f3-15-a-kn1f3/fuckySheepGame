/**
 * @description 羊了个羊一键通关，为安徽加羊 QwQ ！
 *              推荐将token(t)写入脚本
 *              reloadMap是http catcher 过滤规则一般用不到。
 */
import chalk from 'chalk';
import inq from 'inquirer';
import R from 'request';
import { readFileToArr } from './userAgentReader.js'


/** 设置通关时间，默认30，单位：秒 */
let rankTime = 30
/** 日常挑战通关地址 */
let url = `https://cat-match.easygame2021.com/sheep/v1/game/game_over?rank_score=1&rank_state=1&rank_time=${rankTime}&rank_role=1&skin=1`
/** 话题通关地址  `https://cat-match.easygame2021.com/sheep/v1/game/topic_game_over?rank_score=1&rank_state=1&rank_time=${rankTime}&rank_role=2&skin=31`*/

/** 请求头信息添加 t 为 token，你自己的token，需要抓包获取 */
const t = ''


const headers = {
  /** 你自己的token，需要抓包获取，抓包不会劝你不要再继续下去了 */
  "Host": "cat-match.easygame2021.com",
  'User-Agent': 'Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.70 Safari/534.6 TouchPad/1.0',
  t
};

inq.prompt([
  {
    type: "input",
    name: "input",
    message: `${chalk.green('设置你的通关时长后按下回车,默认 30 (单位/秒):\n')}`,
    suffix: ` ${chalk.cyan('time >')}`,
  },
]).then(res => {
  if(res.input) {
    url = `https://cat-match.easygame2021.com/sheep/v1/game/game_over?rank_score=1&rank_state=1&rank_time=${res.input}&rank_role=1&skin=23`
  }
  inq.prompt([
    {
      type: "input",
      name: 'input',
      message: `${chalk.green('设置你的 token ,如已在脚本中添加,请忽略:\n')}`,
      suffix: ` ${chalk.cyan('token >')}`,
    } 
  ]).then(res => {
    if (res.input) {
      headers['t'] = res.input.replace(/[\r\n]/g, "");
    }
    
    if (headers['t'] && rankTime) {
      /** 生成 user-agent */
      readFileToArr((userAgent) => {
        R({
          /** 修改此处选择【日常通关】还是【话题通关】 */
          url,
          method: 'GET',
          json: true,
          headers:{
            ...headers,
            'User-Agent': userAgent
          },
        }, (err, response, body) => {
          if (err) {
            console.log(err)
            console.log(chalk.red('【 request faild 】'))
          }
          if (!err && response.statusCode === 200) {
            console.log(
              chalk.cyan('【 request success 】:\n'), 
              chalk.green(`[status]: ${response.statusCode}\n [tips]: 通关${body.err_msg ? '失败' : '成功'}\n [info]: ${body.err_msg ?? 'null'}\n`),
            )
          }
        })
      })
    } else {
      console.log(chalk.red(`【 error 】: 信息不完善`));
    }
  })
})

// let _counter = 0
// setInterval(() => {
//   R({
//     url:`https://cat-match.easygame2021.com/sheep/v1/game/game_over?rank_score=9999&rank_state=1&rank_time=604&rank_role=1&skin=20`,
//     method: 'GET',
//     json: true,
//     headers,},(err, response, body) => {
//       _counter++
//       if (err) {
//         console.log(chalk.red('【 request faild 】'))
//       }
//       if (!err && response.statusCode === 200) {
//         console.log('通关 %i 次',_counter)
//       }
//     })
// },0)
