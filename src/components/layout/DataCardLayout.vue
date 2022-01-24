<template>
  <div>
    <div class="data-list">
      <data-card v-for="item in show_items" :key="item" :data="item" />
    </div>
    <div class="data-pagination">
      <el-pagination
        v-model:currentPage="page.current_page"
        :page-sizes="page.page_sizes"
        :page-size="page.page_size"
        :total="page.total_count"
        layout="sizes, prev, pager, next, jumper"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
  </div>
  
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
  },
  data() {
    return {
      show_items: [],
      page: {
        total_count: null,
        current_page: null,
        page_size: 10,
        page_sizes: [10, 20, 30, 50, 100]
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page.current_page = val;
      this.changeShowItem()
    },
    handleSizeChange(val) {
      this.page.page_size = val;
      this.changeShowItem()
    },
    changeShowItem() {
      let showx_items = [], start_index = this.page.page_size * (this.page.current_page - 1);
      console.log("start_index: " + start_index)
      for(let i = 0; i < this.page.page_size && start_index + i < this.page.total_count; i++) {
        console.log("index: " + (start_index + i))
        showx_items.push(this.items[start_index + i]);
      }
      this.show_items = showx_items;
    }
  },
  created() {
    let default_size = 10, default_sizes = [1, 5, 10, 20, 30, 50, 100];
    this.page = {
      total_count: this.items.length,
      current_page: 1,
      page_size: default_size,
      page_sizes: default_sizes
    }
    this.changeShowItem()
  },
  watch: {
    items() {
      this.page.total_count = this.items.length
      this.handleCurrentChange(1)
      this.changeShowItem()
    }
  }
}
</script>

<style scoped>
.data-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
