/**
 * 刷新执行的操作
 */
import { useThemeChange } from '@/layout/hooks/useThemeChange';
import { useGlobalConfig } from '@/config';
import { localCache } from '@/utils/cache';

export function useRefresh() {
  const { setEpThemeColor, setModeColor, toggleClass } = useThemeChange();
  const { getConfig, globalNameSpace } = useGlobalConfig();

  const currentConfig: PlatformConfigs = localCache.get(globalNameSpace) || getConfig();

  const refresh = () => {
    // 设置主题颜色
    setEpThemeColor(currentConfig.EpThemeColor, true);
    // 设置深浅模式
    setModeColor();
    // 设置布局
    window.document.body.setAttribute('layout', currentConfig.Layout);
    // 设置是灰色模式
    toggleClass(currentConfig.Grey, 'html-grey', document.querySelector('html'));
  };

  return {
    refresh,
  };
}
