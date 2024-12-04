declare global {
  interface PlatformConfigs {
    Version?: string;
    Title?: string;
    KeepAlive?: boolean;
    Layout?: string;
    Locale?: string;
    MultiTagsCache?: boolean;
    Theme?: string;
    Grey?: boolean;
    DarkMode?: boolean;
    EpThemeColor?: string;
    ShowLogo?: boolean;
    HideTabs?: boolean;
    HideFooter?: boolean;
    StorageNameSpace?: string;
  }
}

export {};

declare module 'vue' {
  interface GlobalProperties {
    $config: PlatformConfigs;
  }
}
