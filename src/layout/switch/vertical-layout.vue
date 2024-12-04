<template>
  <el-container class="h-screen">
    <el-aside :width="isSidebarOpened ? '210px' : '56px'">
      <!-- 侧边菜单 -->
      <lay-sidebar />
    </el-aside>
    <el-container>
      <el-header :style="[hideTabs ? 'height: 48px' : 'height: 80px', 'padding: 0px']">
        <!-- 头部导航栏 -->
        <lay-navbar />
        <!-- 页面标签 -->
        <lay-tags v-if="!hideTabs" />
      </el-header>
      <el-main class="app-main main-container">
        <lay-content></lay-content>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import layContent from '../components/lay-content/index.vue';
import layNavbar from '../components/lay-navbar/index.vue';
import laySidebar from '../components/lay-sidebar/nav-vertical.vue';
import layTags from '../components/lay-tag/index.vue';

import { computed } from 'vue';
import { useGlobalConfig } from '@/config';
import { useAppStoreHook } from '@/store/modules/app';

export default {
  name: 'vertical',
  title: '垂直布局',
  components: {
    layContent,
    layNavbar,
    laySidebar,
    layTags,
  },
  setup() {
    const { getConfig } = useGlobalConfig();
    const hideTabs = computed(() => getConfig().HideTabs);
    const molyApp = useAppStoreHook();
    const isSidebarOpened = computed(() => molyApp.getSidebarStatus);
    return {
      hideTabs,
      isSidebarOpened,
    };
  },
};
</script>
