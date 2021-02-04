<template>
  <div id="layout">
    <el-container>
        <el-header><HeaderView /></el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer><FooterView /></el-footer>
    </el-container>
  </div>
</template>

<script>
import FooterView from './components/footer'
import HeaderView from './components/head'
// import MainView from '@/components/Main/Main'
export default {
  name: 'Layout',
  components: {
    HeaderView,
    FooterView,
    // MainView
  }
}
</script>

<style scoped>
#layout{
  width: 100%;
  height: 100%;
}
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        min-width: 800px;
        /* height: 10vh !important; */
        /* line-height: 10vh; */
        /* vertical-align: middle; */
    }
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        width: 100%;
        height: 30px !important;
        position: fixed;
        bottom: 0;
    }
    .el-main {
        text-align: center;
        /* min-height: 400px; */
        height: 100%;
    }
</style>
