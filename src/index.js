export default class AC {
  static install (Vue, options) {
    const ac = new AC(options.roles)

    Object.defineProperty(Vue.prototype, '$ac', {
      get () {
        return {
          check (roles) {
            if (typeof roles === 'string') {
              roles = roles.split(';')
            }
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

  constructor (roles) {
    if (!Array.isArray(roles)) {
      if (typeof roles === 'string') {
        roles = roles.split(';')
      } else {
        throw new TypeError('roles must be any array')
      }
    }
    this.roles = roles
  }

  check (roles) {
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
    roles.forEach(this.addRole)
  }

  clearRoles () {
    this.roles = []
  }
}