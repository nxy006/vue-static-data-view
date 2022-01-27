<template>
  <el-input
    class="mb-3"
    v-model="edit_value"
    placeholder="搜索"
    prefix-icon="Search"
    size="large"
    @change="changValue()">
    <template #suffix>
      <!-- TODO el-icon 绝对布局居中待优化-->
      <el-link type="primary" :underline="false" class="me-4">
        查询 <el-icon style="position: absolute; top: 30%" class="ms-2"><arrow-right /></el-icon>
      </el-link>
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'SearchFiter',
  emits: ["update:modelValue", "updateFilter"],
  props: {
    modelValue: {
      value: String,
      show_value: String,
      filtered: Boolean
    }
  },
  data() {
    return {
      edit_value: "",
      filter: this.modelValue,
    }
  },
  methods: {
    changValue() {
      this.filter.value = this.edit_value
      this.edit_value  = ""
      if (this.filter.value === null || this.filter.value === "") {
        this.filter.show_value = ""
        this.filter.filtered = false;
      } else {
        this.filter.show_value = this.filter.value
        this.filter.filtered = true;
      }
      
      this.$emit('update:modelValue', this.filter)
      this.$emit('updateFilter', this.filter)
    }
  },
  watch: {
    modelValue(value) {
      this.filter = value
    },
  }
}
</script>

<style scoped>

</style>
