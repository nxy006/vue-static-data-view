<template>
  <div>
    <div class="data-grid">
      <el-row :gutter="10" id="aside-filter">
        <el-col :span="8">
          <div v-for="(item, i) in show_items" :key="item">
            <data-grid v-if="i%3 == 0" :data="item" />
          </div>
        </el-col>
        <el-col :span="8">
          <div v-for="(item, i) in show_items" :key="item">
            <data-grid v-if="i%3 == 1" :data="item" />
          </div>
        </el-col>
        <el-col :span="8">
          <div v-for="(item, i) in show_items" :key="item">
            <data-grid v-if="i%3 == 2" :data="item" />
          </div>
        </el-col>
      </el-row>
      <el-empty
        v-if="show_items === null || show_items.length === 0"
        description="无数据"
        style="height: 500px">
      </el-empty>
    </div>
    <div class="data-pagination">
      <el-pagination
        v-model:currentPage="page.current_page"
        :page-sizes="page.page_sizes"
        :page-size="page.page_size"
        :total="page.total_count"
        :hide-on-single-page="true"
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
import DataGrid from '@/components/data/DataGrid'

export default {
  name: 'DataGridLayout',
  components: {
    DataGrid
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
        page_size: 12,
        page_sizes: [6, 12, 24, 36, 300]
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
      for(let i = 0; i < this.page.page_size && start_index + i < this.page.total_count; i++) {
        showx_items.push(this.items[start_index + i]);
      }
      this.show_items = showx_items;
    }
  },
  created() {
    let default_size = 12, default_sizes = [6, 12, 24, 36, 300];
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
