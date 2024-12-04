/** @TODO 获取平台的配置，目前先选几个实现 */
import axios from 'axios';
import { createGlobalState, useStorage } from '@vueuse/core';
import { isEmpty } from 'lodash-es';
import { localCache } from '@/utils/cache';

const { VITE_PUBLIC_PATH } = import.meta.env;
let nameSpace: string = '';

/** 获取项目动态全局配置 */
export const getPlatformConfig = async (): Promise<any> => {
  return axios({
    method: 'get',
    url: `${VITE_PUBLIC_PATH}platform-config.json`,
  })
    .then(({ data: config }) => {
      // 不采用挂载在app.config.globalProperties上这种方法，因为在ts文件中无法获取
      // 所以采用vueuse的createGlobalState创建全局变量
      nameSpace = config.StorageNameSpace;
      return config;
    })
    .catch(() => {
      throw '请在public文件夹下添加platform-config.json配置文件';
    });
};

/** 操作全局配置的方法 */
export const useGlobalConfig = createGlobalState(() => {
  // 放在createGlobalState下的全局变量
  const globalNameSpace = nameSpace;
  const globalConfig = useStorage<PlatformConfigs>(globalNameSpace, {});

  /** 初始化全局配置 */
  const initConfig = (storageNameSpace: string, config: PlatformConfigs) => {
    // 先判断localStorage是否有配置，没有再使用原始的配置
    // 注意配置的缓存没有expiretime，采用原生的操作方式
    const $config = localCache.get(storageNameSpace);
    if (isEmpty($config)) {
      localCache.set(storageNameSpace, config);
    } else {
      localCache.set(storageNameSpace, $config);
    }
  };

  const getConfig = (key?: string): PlatformConfigs => {
    // @TODO key判断机制
    return globalConfig.value;
  };

  const setConfig = (cfg?: object) => {
    globalConfig.value = { ...getConfig(), ...cfg };
  };

  return {
    globalNameSpace,
    getConfig,
    setConfig,
    initConfig,
  };
});