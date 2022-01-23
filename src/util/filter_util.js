
const Filter = {
  init: (config, data) => {
    if (config === null && config.lenght === 0 || data === null && data.length === 0) {
      return null;
    }

    // TODO 暂为默认配置，未来应根据类型生成
    return [{
      show_name: "搜索",
      show_value: "",
      key: "",
      type: 'search',
      value: null,
      filtered: false,
      searchable_fields: ["name"],
      filter: (filter, item) => {
        var search_value = filter.value
        if (filter.value === null || search_value === "") {
          return true;
        }

        for(const key of filter.searchable_fields) {
          if (item[key] !== null && item[key].indexOf(search_value) >= 0) {
            return true;
          }
        }
        return false;
      },
      clear: (filter) => {
        filter.value = null
        filter.filtered = false
        return filter;
      }
    }, {
      show_name: "分类",
      show_value: "",
      key: "type",
      type: 'select',
      value: null,
      filtered: false,
      extOption: {
        placeholder: "选择分类",
        options: ["分类一", "分类二", "分类三"],
      },
      filter: (filter, item) => {

        if (filter.value === null || filter.value === "") {
          return true;
        }
        return filter.value === item[filter.key];
      },
      clear: (filter) => {
        filter.value = null
        filter.filtered = false
        return filter;
      }
    }, {
      show_name: "分类",
      show_value: "",
      key: "type",
      type: 'checkbox',
      value: [],
      filtered: false,
      extOption: {
        placeholder: "选择分类",
        options: ["分类一", "分类二", "分类三"],
      },
      filter: (filter, item) => {

        if (filter.value === null || filter.value.length === 0) {
          return true;
        }
        return filter.value.indexOf(item[filter.key]) !== -1;
      },
      clear: (filter) => {
        filter.value = []
        filter.filtered = false
        return filter;
      }
    }, {
      name: "amount",
      show_name: "价格",
      value: null,
      show_value: "",
      key: "amount",
      type: 'slider',
      filtered: false,
      min: 100,
      max: 200,
      filter: (filter, item) => {
        if (filter.value === null || filter.value === "" || typeof item[filter.key] !== 'number') {
          return true;
        }
        return filter.value[0] <= item[filter.key] && item[filter.key] <= filter.value[1];
      },
      clear: (filter) => {
        filter.value = [filter.min, filter.max];
        filter.filtered = false;
        return filter;
      }
    }]
  }
}

export default Filter
