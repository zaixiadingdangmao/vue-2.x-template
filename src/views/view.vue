<!--
* @Description: 视图首页
* @Author: zhangxuelong
* @Date: 2022-05-05 14:33:29
!-->
<template>
  <div class='view--wrapper'>
    <h1 @click="handlerClick">请求</h1>
  </div>
</template>

<script>
import { post } from '@/api/index.js';
export default {
  name: 'viewPage',
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async handlerClick() {
      let formData = new FormData();
      formData.append('id', '123');
      const res = await post('http://192.168.0.168:8000', formData);
      console.log('🚀  -> file: view.vue -> line 25 -> res', res);
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {}
};
</script>
<style lang='scss' scoped>
.view--wrapper {
  width: 100%;
  height: 100%;
}
</style>