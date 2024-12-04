<template>
  <div :class="['app-wrapper', theme]">
    <!-- 主题布局 -->
    <component :is="currentLayout" />
    <!-- 系统设置 -->
    <lay-setting />
    <!-- 返回顶部 -->
    <el-backtop title="回到顶部" target=".main-container .el-scrollbar__wrap">
      <BackTopIcon />
    </el-backtop>
  </div>
</template>
<script lang="ts" setup>
import laySetting from './components/lay-setting/index.vue';
import switchLayoutList from '@/layout/switch/index';
import BackTopIcon from '@/assets/svg/back_top.svg?component';

import { computed } from 'vue';
import { useGlobalConfig } from '@/config';
import { cloneDeep } from 'lodash-es';
const { getConfig } = useGlobalConfig();

const theme = computed(() => getConfig().Theme ?? 'default');
const layout = computed(() => getConfig().Layout ?? 'vertical');
const layoutList = cloneDeep(switchLayoutList);
const currentLayout = computed(() => layoutList.find((item) => item.name === layout.value));
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    display: table;
    clear: both;
    content: '';
  }
}
</style>
