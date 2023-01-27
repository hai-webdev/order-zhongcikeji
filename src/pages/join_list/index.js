// 引入公共css
import "../common/reset.css";
import "@/assets/global.less";
// 引入页面公共部分的js
import "../common/header";
import "./index.less";
import list from "@/api/list";
import datacall from "@/api/datacall";
import inputIosInvalid from "@/assets/global";
const vm = new Vue({
  el: "#app",
  data() {
    return {
      positionArr: [
        {
          label: "- 请选择 -",
          val: "",
          active: true,
        },
      ],
      index: 0,
      selectShow: false,
      searchText: "",
      joinList: [],
    };
  },
  async created() {
    this.setPositionType();
    this.getjoinList();
  },
  methods: {
    /**
     * 改变select选中的值
     * @param {Object}} item 数组中的一项
     * @param {Number} index 索引
     */
    changeIndex(item, index) {
      this.positionArr.map((el) => {
        this.$set(el, "active", false);
      });
      this.index = index;
      this.$set(item, "active", true);
      this.selectShow = false;
      this.positionFilter();
    },
    /**
     * 切换select的显示与隐藏
     */
    selectToggle() {
      this.selectShow = !this.selectShow;
    },
    /**
     * 设置职位类别
     */
    async setPositionType() {
      const jobInfo = await datacall({ id: "job-category" });
      const position = [];
      for (const key in jobInfo.tree) {
        if (Object.hasOwnProperty.call(jobInfo.tree, key)) {
          const el = jobInfo.tree[key];
          position.push({
            label: el.title,
            val: el.title,
          });
        }
      }
      this.positionArr.push(...position);
    },
    /**
     * 获取职位列表
     */
    async getjoinList(keywords, type) {
      const joinInfo = await list({ id: "join-us", keywords });
      const joinList =
        joinInfo &&
        joinInfo.rslist.filter((item) => {
          if (!type) {
            return true;
          }
          return item.cate.title === type;
        }).map((item) => {
        const params = [];
        if (item.params) {
          for (const key in item.params) {
            if (Object.hasOwnProperty.call(item.params, key)) {
              const val = item.params[key];
              params.push(key + "：" + val);
            }
          }
        }
        return {
          title: item.title,
          url: item.url,
          id: item.id,
          info: params,
        };
      });
      this.joinList = joinList;
    },
    /**
     * 职位筛选
     */
    async positionFilter() {
      const keywords = this.searchText,
        type = this.positionArr[this.index].val;
      this.getjoinList(keywords, type);
    },
    /**
     * 重置选项
     */
    resetSelect(){
      this.searchText = "";
      this.index = 0;
      this.getjoinList()
    }
  },
});
inputIosInvalid();