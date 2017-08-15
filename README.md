# vue-ac

Vue Access Control Plugin

## install 

```javascript
import Vue from 'vue'
import VueAc from 'vue-ac'
import router from './router'
Vue.use(VueAc, {
  router,
  roles: ['user']
})
```

## Useage

### element

```
<div v-ac="['admin']"></div>
```

### router 

router.addRoutes([
  {
    path: '/path',
    name: 'name',
    component: Component,
    meta: {
      ac: ['admin'],
      fail: '/401'
    }
  }
])