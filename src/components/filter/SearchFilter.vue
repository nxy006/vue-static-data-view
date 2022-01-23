<template>
  <!-- <el-card v-if="filter.type === 'search'" class="box-card" :body-style="{ padding: '20px' }" :style="{ 'margin-bottom': '10px' }" shadow="never">
    
  </el-card> -->

  <el-input class="mb-3" v-model="filter.value" size="large" @input="changValue()" placeholder="搜索" />
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
      filter: this.modelValue,
    }
  },
  methods: {
    changValue() {
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
