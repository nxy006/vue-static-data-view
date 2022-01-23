<template>
  <div v-for="(filter, i) in filters" :key="filter">
    <search-filter v-if="filter.type === 'search'" v-model="filters[i]" @updateFilter="updateFilter()" />

    <el-card
      v-if="filter.type !== 'search'"
      class="box-card"
      :body-style="{ padding: '5px 20px' }"
      :style="{ 'margin-bottom': '10px' }"
      shadow="never">
      
      <el-collapse
        model-value="default"
        accordion class="fiter-collapse"
        >
        <el-collapse-item :title="filter.show_name" name="default">
          <!-- 单选类型 -->
          <select-filter v-if="filter.type === 'select'" v-model="filters[i]" @updateFilter="updateFilter()" />
          <!-- 多选类型 -->
          <checkbox-filter v-if="filter.type === 'checkbox'" v-model="filters[i]" @updateFilter="updateFilter()" />
          <!-- 滑块类型 -->
          <slider-filter v-if="filter.type === 'slider'" v-model="filters[i]" @updateFilter="updateFilter()" />
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import SearchFilter from '@/components/filter/SearchFilter'
import SelectFilter from '@/components/filter/SelectFilter'
import CheckboxFilter from '@/components/filter/CheckboxFilter'
import SliderFilter from '@/components/filter/SliderFilter'

export default {
  name: 'AsideFilter',
  emits: ["update:modelValue", "updateFilter"],
  components: {
    SearchFilter,
    SelectFilter,
    CheckboxFilter,
    SliderFilter
  },
  props: {
    modelValue: Array
  },
  data() {
    return {
      filters: this.modelValue
    }
  },
  methods: {
    updateFilter() {
      this.$emit('updateFilter')
    }
  },
  watch: {
    // TODO 可能因为是数组的原因，目前来看以下两个 watch 均不会被触发
    modelValue(value) {
      this.filters = value
    },
    filters(value) {
      this.$emit('update:modelValue', value)
      this.$emit('updateFilter')
    }
  }
}
</script>

<style>
.fiter-collapse,
.fiter-collapse .el-collapse-item__header,
.fiter-collapse .el-collapse-item__wrap {
  border: 0px;
}

.fiter-collapse .el-collapse-item__header {
  font-size: 18px
}

.fiter-collapse .el-collapse-item__content {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
