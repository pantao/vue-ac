export default class AC {
  static install (Vue, options) {
    const ac = new AC(options)

    Object.defineProperty(Vue.prototype, '$ac', {
      get () {
        return {
          check (roles) {
            return ac.check(roles)
          },
          addRole (role) {
            return ac.addRole(role)
          },
          addRoles (roles) {
            return ac.addRoles(roles)
          },
          clearRoles () {
            return ac.clearRoles()
          }
        }
      }
    })

    Vue.directive('ac', (el, binding) => {
      if (!ac.check(binding.value)) {
        el.style.display = 'none'
      }
    })
  }

  constructor (options) {
    const {router, roles} = options
    this.router = router
    if (!Array.isArray(roles)) {
      if (typeof roles === 'string') {
        this.roles = roles.split(';')
        return
      } else {
        throw new TypeError('roles must be any array')
      }
    }
    this.roles = roles
  }

  check (roles) {
    if (typeof roles === 'string') {
      roles = roles.split(';')
    }
    let checked = false
    roles.forEach(role => {
      if (this.roles.indexOf(role) > -1) {
        checked = true
      }
    })
    return checked
  }

  addRole (role) {
    if (this.roles.indexOf(role) == -1) {
      this.roles.push(role)
    }
  }

  addRoles (roles) {
    roles.forEach(role => this.addRole(role))
  }

  clearRoles () {
    this.roles = []
  }

  set router (router) {
    router.beforeEach((to, from, next) => {
      const fail = to.meta.fail || '/'
      if (typeof to.meta.ac === 'undefined' || to.meta.ac === '')
        return next()
      else {
        if (!this.check(to.meta.ac))
          return next(fail)
        next()
      }
    })
  }
}