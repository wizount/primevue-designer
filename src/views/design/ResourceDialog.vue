 <template>
  <div>
    <p-dialog
        v-bind="$attrs"
        title="外部资源引用"
        width="600px"
        :close-on-click-modal="false"
        @show="onOpen"
        @close="onClose"
    >
      <p-input-text
          v-for="(item, index) in resources"
          :key="index"
          v-model="resources[index]"
          class="url-item"
          placeholder="请输入 css 或 js 资源路径"
          prefix-icon="Link"
          clearable
      >
        <template #append>
          <p-button
              @click="deleteOne(index)"
          />
        </template>

      </p-input-text>
      <p-button-group class="add-item">
        <p-button
            plain
            @click="addOne('https://lib.baomitu.com/jquery/1.8.3/jquery.min.js')"
        >
          jQuery1.8.3
        </p-button>
        <p-button plain @click="addOne('https://unpkg.com/http-vue-loader')">
          http-vue-loader
        </p-button>
        <p-button plain @click="addOne('')">
          添加其他
        </p-button>
      </p-button-group>
      <template #footer>
        <p-button @click="close"> 取消</p-button>
        <p-button severity="primary" @click="handelConfirm"> 确定</p-button>
      </template>

    </p-dialog>
  </div>
</template>

<script>
import {
  Link as ElIconLink,
  Delete as ElIconDelete,
  CirclePlus as ElIconCirclePlus,
} from '@primevue/icons-vue'
import {deepClone} from '@/utils'

export default {
  data() {
    return {
      resources: null,
      ElIconLink,
      ElIconDelete,
      ElIconCirclePlus,
    }
  },
  components: {PDialog},
  inheritAttrs: false,
  props: ['originResource'],
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    onOpen() {
      this.resources = this.originResource.length
          ? deepClone(this.originResource)
          : ['']
    },
    onClose() {
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      const results = this.resources.filter((item) => !!item) || []
      this.$emit('save', results)
      this.close()
      if (results.length) {
        this.resources = results
      }
    },
    deleteOne(index) {
      this.resources.splice(index, 1)
    },
    addOne(url) {
      if (this.resources.indexOf(url) > -1) {
        //this.ElMessage('资源已存在')
      } else {
        this.resources.push(url)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.add-item {
  margin-top: 8px;
}

.url-item {
  margin-bottom: 12px;
}
</style>
