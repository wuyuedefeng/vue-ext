# Install
```
$ npm install vue-ext
```

```
import Vue from 'vue'
import VueExt from 'vue-ext'
Vue.use(VueExt)

```

# `this.$ext`

---
通过`js`挂载某个组件到视图中
```
let componentInstance = this.$ext.mount(Component, options)
```

#### options

- onEl: 挂载到哪个dom上，默认： `document.body`

其他参数会作为`Component`的`props`

#### 返回值

Component实例化对象

---
通过`js`移除挂载的对象
```
this.$ext.unmount(componentInstance)
```

# Directives

## Input

### debounce

v-debounce: default: `600ms`

文本框内容改变后`600ms`内不再改变文本内容触发`change`事件

如果需要绑定的值也延迟`600ms`，添加lazy参数
```
<input type="text" v-model="input" @change="changeInputValue" v-debounce="600">
<input type="text" v-model.lazy="input" @change="changeInputValue" v-debounce="600">
```

## Img

### src

v-src: 图片懒加载
```
<img src="../assets/logo.png" alt="" v-src="imgSrc">
export default {
  data () {
    return {
      imgSrc: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.imgSrc = 'http://www.baxx.com/.../1.jpg'
    })
  }
}
```
