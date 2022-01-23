<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }" shadow="never">
    <div class="info-card-body">
    <!-- style="width: 250px; height: 250px" -->
    <el-image
        style="position: absolute; width: 250px; height: 250px"
        :src="data.preview_urls[0]"
        fit="cover"
        :preview-src-list="data.preview_urls"
        :initial-index="1"
        :hide-on-click-modal="true"
    >
    </el-image>
    <div style="padding: 14px; margin-left: 250px;">
        <div class="mb-2">
          <a :style="{'font-size': '24px'}"> {{ data.name }}</a>
        </div>

        <p> {{ data.tile || "" }} </p>
        <p> 分类：{{ data.type }} / 价格：{{ data.amount }} 元</p>
        <p> {{ data.description }}</p>

        <div class="mt-2">
          <el-tag
              v-for="tag in data.tags"
              :key="tag"
              class="me-2"
              effect="dark"
              size="large"
          >
            {{ tag }}
          </el-tag>
        </div>
    </div>
    </div>
</el-card>
</template>

<script>
export default {
  name: 'DataCard',
  props: {
    data: Object
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}

.info-card-body {
  min-height: 250px;
}
</style>
