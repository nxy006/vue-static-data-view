<template>
  <el-select
    v-model="filter.value"
    class="my-2"
    :placeholder="filter.extOption.placeholder"
    size="large"
    @change="changValue()"
    clearable>
    <el-option
      v-for="option in filter.extOption.options"
      :key="option"
      :label="option"
      :value="option"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'SelectFilter',
  emits: ["update:modelValue", "updateFilter"],
  props: {
    modelValue: {
      value: String,
      show_value: String,
      filtered: Boolean,
      extOption: {
        placeholder: String,
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
      if (this.filter.value === null || this.filter.value === "") {
        this.filter.show_value = ""
        this.filter.filtered = false;
      } else {
        this.filter.show_value = this.filter.value
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
.box-card {
  margin-bottom: 20px;
}

.info-card-body {
  min-height: 250px;
}
</style>
