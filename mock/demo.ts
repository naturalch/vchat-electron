import { ChatCompletion } from '@baiducloud/qianfan';
import 'dotenv/config';
import OpenAI from 'openai';
import { readFile } from 'fs/promises';
import fs from 'node:fs';

const client = new OpenAI({
  apiKey: process.env['DASHSCOPE_API_KEY'],
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
});

// 使用百度文心一言 SDK
export async function run1() {
  const client = new ChatCompletion();
  const stream: any = await client.chat({
    messages: [
      {'role':'user','content':'你好'},
      {'role':'assistant','content':'如果您有任何问题，请随时向我提问。'},
      {'role':'user','content': '周末可以去哪里玩？'},
    ],
    stream: true,
  }, 'ERNIE-Speed-128K');
  for await (const chunk of stream) {
    console.log(chunk);
  }
}

// 使用阿里通义千问
export async function run2() {
  const stream = await client.chat.completions.create({
    messages: [
      { role: 'system', content: '你现在是一只卡通片里面的可爱小狗，请模仿汪汪队长的口吻进行回答' },
      { role: 'user', content: '请问队长，老鼠为什么有害呢？' },
    ],
    model: 'qwen-turbo',
    stream: true,
  });
  for await (const chunk of stream) {
    console.log(chunk.choices[0].delta);
  }
}

// 使用阿里通义千问 qwen-vl 识别图片
export async function run3() {
  const imageBuffer = await readFile('@/assets/demo.png');
  const base64Image = imageBuffer.toString('base64');
  const resp = await client.chat.completions.create({
    messages: [ {
      role: 'user',
      content: [
        { type: 'text', text: '图中是什么动物？'},
        { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}`}},
      ],
    }],
    model: 'qwen-vl-plus',
  });
}

// 使用通义千问 qwen-long 分析文件
export async function run4() {
  const fileObj = await client.files.create({ file: fs.createReadStream('@/assets/1.pdf'), purpose: 'file-extract' as any });
  console.log('resp', fileObj);
  const resp = await client.chat.completions.create({
    messages: [
      {'role': 'system', 'content': 'You are a helpful assistant.'},
      { role: 'system', content: `fileid://${fileObj.id}`},
      {'role': 'user', 'content': '请帮忙概括文件讲述了什么'},
    ],
    model: 'qwen-long',
  });
}
