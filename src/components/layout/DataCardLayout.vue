<template>
  <div v-for="item in items" :key="item">
    <data-card :data="item" />
  </div>
</template>

<script>
import DataCard from '@/components/data/DataCard'

export default {
  name: 'DataCardLayout',
  components: {
    DataCard
  },
  props: {
    items: Array
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
