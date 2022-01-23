<template>
  <div class="checkbox-filter px-2">
    <el-checkbox-group v-model="filter.value" size="large" @change="changValue()">
      <el-checkbox
        v-for="option in filter.extOption.options"
        :key="option"
        :label="option"
        size="large">
        {{ option }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'CheckboxFilter',
  emits: ["update:modelValue", "updateFilter"],
  props: {
    modelValue: {
      value: String,
      show_value: String,
      filtered: Boolean,
      extOption: {
        options: Array,
      }
    }
  },
  data() {
    return {
      filter: this.modelValue
    }
  },
  methods: {
    changValue() {
      if (this.filter.value === null || this.filter.value.length === 0) {
        this.filter = this.filter.clear(this.filter);
      } else {
        this.filter.show_value = this.filter.value.join(", ")
        this.filter.filtered = true;
      }
      
      this.$emit('update:modelValue', this.filter)
      this.$emit('updateFilter')
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
