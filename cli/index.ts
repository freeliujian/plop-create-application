import fs, {readFileSync} from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import chalk from 'chalk'

const __dirname = dirname(fileURLToPath(import.meta.url));

const cliPath = path.resolve(__dirname, '../../generator');

const getGeneratorFile = fs.readdirSync(`${cliPath}`).filter((f) => !f.startsWith('.')).map((f) => {
  return {
    name: `${f.padEnd(15)} - ${chalk.gray(JSON.parse(readFileSync(`${cliPath}/${f}/explain.json`, 'utf-8')).desc)}`,
    value: f,
    short: f,
  };
});

const actionStep = (plop: any) => {
  plop.setHelper('includes', (context: string | any[], item: any, options: any) => {
    if (context.includes(item)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  plop.setGenerator('basics', {
    description: '模板脚手架',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: '请选择你要使用的模板',
        choices: getGeneratorFile,
      },
      {
        type: 'input',
        name: "name",
        message: '请为你的项目命名',
        validate: (value: any) => {
          if ((/^.+$/).test(value) && !(/[A-Z]/).test(value)) {
            return true;
          }
          return '命名不规范，请重新命名';
        }
      },
      {
        type: 'checkbox',
        name: 'features',
        message: '请选择你你要安装的模块',
        default: ["tailwind", "antd", "ahooks"],
        choices: [
          { name: 'tailwind', value: 'tailwind' },
          { name: "antd", value: "antd" },
          { name: 'ahooks', value: 'ahooks' },
        ]
      },
      {
        type: 'number',
        name: "port",
        message: '设置端口号',
        default: 3000,
      }
    ],
    actions: () => {
      const action = [];
      action.push({
        type: 'addMany',
        destination: `{{name}}/`,
        base: '../../generator/{{type}}/templates/',
        templateFiles: `../../generator/{{type}}/templates/**`,
        abortOnFail: true
      })
      return action; 
    }
  });
}


export default actionStep;