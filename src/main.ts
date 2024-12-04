import App from './App.vue';
import router from './router';
import { store } from './store';

import { createApp } from 'vue';
import { useI18n } from '@/plugins/i18n';
import { useElementPlus } from './plugins/element-plus';
import { getPlatformConfig, useGlobalConfig } from '@/config';
import { useRefresh } from './hooks/useRefresh';

// 引入重置样式
import './style/reset.scss';
// 引入公共样式
import '@/style/index.scss';
import '@/style/tailwind.css';
import 'element-plus/dist/index.css';
// 导入字体图标
import './assets/iconfont/iconfont.js';
import './assets/iconfont/iconfont.css';
const app = createApp(App);

// 全局注册@iconify/vue图标库
import { IconifyIconOffline, IconifyIconOnline } from '@/components/ReIcon';
app.component('IconifyIconOffline', IconifyIconOffline);
app.component('IconifyIconOnline', IconifyIconOnline);

// 获取配置
getPlatformConfig().then(async (config) => {
  app.use(store);
  app.use(router);
  await router.isReady();
  const { initConfig } = useGlobalConfig();
  const { refresh } = useRefresh();
  // 初始化配置
  initConfig(config.StorageNameSpace, config);
  // 刷新执行的逻辑
  refresh();
  app.use(useElementPlus);
  app.use(useI18n);
  app.mount('#app');
});
