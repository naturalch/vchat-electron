import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>;
  const { root, mode, forgeConfigSelf, command } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [
      vue(),
      pluginExposeRenderer(name),
      viteMockServe({
        mockPath: 'mock',
        enable: command === 'serve',
        logger: true, 
      }),
      // electron 使用 cjs，需要使用低版本 unplugin-auto-import
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue$/,
          /\.vue\?vue/,
          /\.vue\.[tj]sx?\?vue/,
        ],
        // 生成类型文件 -> 在 eslint 配置中 extends，避免报变量没有定义的错误
        eslintrc: {
          enabled: true,
          filepath: resolve(__dirname, './src/types/.eslintrc-auto-import.json'),
          globalsPropValue: true,
        },
        imports: ['vue', 'vue-router'],
        dts: resolve(__dirname, './src/types/auto-imports.d.ts'),
      }),
    ],
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      open: false,
      proxy: {
        '^/api': {
          target: '',
        },
      },
    },
    clearScreen: false,
  } as UserConfig;
});
