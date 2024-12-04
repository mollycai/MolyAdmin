// element-plus国际化
import enLocale from 'element-plus/es/locale/lang/en';
import zhLocale from 'element-plus/es/locale/lang/zh-cn';
import { App } from 'vue';
import { I18n, createI18n } from 'vue-i18n';

const modules = async () => import.meta.glob('../locales/*.json', { eager: true });
console.log(await modules());
const siphonI18n = (function () {
  // 仅初始化一次国际化配置
  let cache = Object.fromEntries(
    Object.entries(import.meta.glob('../locales/*.json', { eager: true })).map(([key, value]: any) => {
      console.log(key, value);
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    }),
  );
  return (prefix = 'zh-CN') => {
    return cache[prefix];
  };
})();

export const localesConfigs = {
  zh: {
    ...siphonI18n('zh-CN'),
    ...zhLocale,
  },
  en: {
    ...siphonI18n('en'),
    ...enLocale,
  },
};
/** 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除 */
export const $t = (key: string) => key;

export const i18n: I18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: localesConfigs,
});

export function useI18n(app: App) {
  app.use(i18n);
}
