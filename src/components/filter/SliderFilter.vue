<template>
  <div class="px-3">
    <el-slider
      v-model="filter.value"
      :min="filter.min"
      :max="filter.max"
      @change="changValue()"
      range>
    </el-slider>
  </div>
</template>

<script>
export default {
  name: 'SliderFilter',
  emits: ["update:modelValue", "updateFilter"],
  props: {
    modelValue: {
      name: String,
      value: Object,
      show_value: String,
      min: Number,
      max: Number
    }
  },
  data() {
    return {
      filter: this.modelValue
    }
  },
  methods: {
    changValue() {
      if (this.filter.value === null ||
          this.filter.value[0] === this.filter.min && this.filter.value[1] ===  this.filter.max) {
        this.filter.show_value = ""
        this.filter.filtered = false;
      } else {
        this.filter.show_value = this.filter.value[0] + " - " + this.filter.value[1]
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
