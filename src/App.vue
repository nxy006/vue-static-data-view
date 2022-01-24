<template>
  <el-container id="container">
    <el-header height="300px">{{title}}</el-header>
    <el-main id="main_view">
      <el-row :gutter="30" id="aside-filter">
        <el-col :span="8">
          <div v-if="filters.length !== 0">
            <aside-filter v-model="filters" @updateFilter="filterItems()" />
          </div>
        </el-col>
        <el-col
          :span="16"
          class="main-content">

          <!-- 数据展示 -->
          <div class="data-panel my-3">
            <div class="data-info mb-2">
              <!-- 字段和排序信息展示 -->
              <div>
                <a>共计 {{items.length}} 条数据</a>
                <a class="ms-5">排序： </a>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{ sort_with }}
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="sort_with = '原始排序'">原始排序</el-dropdown-item>
                      <el-dropdown-item @click="sort_with = '名称'" disabled>名称</el-dropdown-item>
                      <el-dropdown-item @click="sort_with = '分类'" disabled>分类</el-dropdown-item>
                      <el-dropdown-item @click="sort_with = '价格'" disabled>价格</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
              
              <div class="layout-radio">
                <el-radio-group v-model="current_layout" size="small">
                  <el-radio-button label="card" name="card">
                    <el-icon :size="24"><postcard /></el-icon> 列表视图
                  </el-radio-button>
                  <el-radio-button name="grid" disabled>
                    <el-icon :size="24"><grid  /></el-icon> 网格视图
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>

            <div>
              <el-tag
                v-for="(filter, i) in filters" :key="filter"
                v-show="filter.filtered"
                class="me-2"
                closable
                color="white"
                effect="plain"
                size="large"
                @close="clearFiter(filter, i)"
              >
                {{ filter.show_name }}：{{ filter.show_value }}
              </el-tag>
            </div>
          </div>

          <data-card-layout :items="items"/>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import AsideFilter from '@/components/layout/AsideFilter'
import DataCardLayout from '@/components/layout/DataCardLayout'
import Filter from '@/util/filter_util.js'

var appVue = null;

export default {
  name: 'App',
  components: {
    AsideFilter,
    DataCardLayout
  },
  data() {
    return {
      title: 'Information Page',
      current_layout: 'card',
      sort_with: "原始排序",
      origin_items: [],
      items: [],
      config: {},
      filters: [],
      load_filter: false
    }
  },
  methods: {
    // 触发数据过滤
    updatedFilter(value) {
      this.filters = value;
      this.filterItems();
    },
    // 执行数据过滤
    filterItems() {
      var filtered_items = []
      for(const item of this.origin_items) {
        let filterPass = true;
        for(const filter of this.filters) {
          if (filter.filtered === true && typeof filter.filter === "function") {
            if (filter.filter(filter, item) === false) {
              filterPass = false;
              break;
            }
          }
        }
        if (filterPass) {
          filtered_items.push(item);
        }
      }
      this.items = filtered_items
    },
    // 清除静态过滤
    clearFiter(filter, i) {
      if (typeof filter.clear === "function") {
        this.filters[i] = filter.clear(filter)
        this.filterItems()
      }
    },
    // 加载静态数据（仅供外部调用）
    initData: (data) => {
      if (data === null || data.length === 0) {
        return ;
      }
      appVue.origin_items = data
      appVue.items = data
    },
    // 加载静态配置（仅供外部调用）
    initConfig: (config) => {
      if (config === null || config.length === 0) {
        return ;
      }
      
      appVue.title = config.title
      appVue.config = config.config
    }
  },
  computed: {
    filterWatcher() {
      const { config, items } = this
      return {
        config,
        items
      }
    }
  },
  watch: {
    // 数据准备完成后，加载过滤器（仅加载一次）
    filterWatcher: {
      handler: function() {
        if (appVue.load_filter) {
          return ;
        }
        let filters = Filter.init(this.config, this.items)
        appVue.filters = filters
        appVue.load_filter = true
      },
      deep: true
    }
  },
  mounted() {
    appVue = this;
    window.initData = this.initData
    window.initConfig = this.initConfig
  }
}
</script>

<style>
@import 'assets/css/common.css';

.el-header {
  background-image:
    linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), 
    url("../public/images/backgroud-pexels-creative-vix-9754.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
  margin: 0px;
}

.main-content {
  background: #f0f0f0;
}

#main_view {
  width: 1280px;
  margin: 10px auto;
}

/* .layout-radio .el-radio-button__inner {
  padding: 0px;
} */
.data-panel .data-info {
  display: flex; align-items: center;justify-content:space-between
}

.data-panel .el-dropdown {
  color: var(--el-color-primary);
  font-size: 16px;
}

</style>
