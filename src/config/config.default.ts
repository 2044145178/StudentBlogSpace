import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1647510650976_6233',
  koa: {
    port: 7001,
  },
  orm: {
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'123456',
    database:'student-blog-space',
    synchronize:false,
  },
  // swagger 配置
  swagger : {
    title: 'StudentBlogSpace',
    description: 'StudentBlogSpace for midway api',
    version: '0.1',
    termsOfService: '',
    contact: {
      name: 'API Support',
      url: 'http://www.example.com/support',
      email: 'support@example.com',
    },
    license: {
      name: 'MIT',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
    servers:[]
  }
} as MidwayConfig;
