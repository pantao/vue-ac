'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AC = function () {
  _createClass(AC, null, [{
    key: 'install',
    value: function install(Vue, options) {
      var ac = new AC(options);

      Object.defineProperty(Vue.prototype, '$ac', {
        get: function get() {
          return {
            check: function check(roles) {
              return ac.check(roles);
            },
            addRole: function addRole(role) {
              return ac.addRole(role);
            },
            addRoles: function addRoles(roles) {
              return ac.addRoles(roles);
            },
            clearRoles: function clearRoles() {
              return ac.clearRoles();
            }
          };
        }
      });

      Vue.directive('ac', function (el, binding) {
        if (!ac.check(binding.value)) {
          el.style.display = 'none';
        }
      });
    }
  }]);

  function AC(options) {
    _classCallCheck(this, AC);

    var router = options.router,
        roles = options.roles;

    this.router = router;
    if (!Array.isArray(roles)) {
      if (typeof roles === 'string') {
        this.roles = roles.split(';');
        return;
      } else {
        throw new TypeError('roles must be any array');
      }
    }
    this.roles = roles;
  }

  _createClass(AC, [{
    key: 'check',
    value: function check(roles) {
      var _this = this;

      if (typeof roles === 'string') {
        roles = roles.split(';');
      }
      var checked = false;
      roles.forEach(function (role) {
        if (_this.roles.indexOf(role) > -1) {
          checked = true;
        }
      });
      return checked;
    }
  }, {
    key: 'addRole',
    value: function addRole(role) {
      if (this.roles.indexOf(role) == -1) {
        this.roles.push(role);
      }
    }
  }, {
    key: 'addRoles',
    value: function addRoles(roles) {
      var _this2 = this;

      roles.forEach(function (role) {
        return _this2.addRole(role);
      });
    }
  }, {
    key: 'clearRoles',
    value: function clearRoles() {
      this.roles = [];
    }
  }, {
    key: 'router',
    set: function set(router) {
      var _this3 = this;

      router.beforeEach(function (to, from, next) {
        var fail = to.meta.fail || '/';
        if (typeof to.meta.ac === 'undefined' || to.meta.ac === '') return next();else {
          if (!_this3.check(to.meta.ac)) return next(fail);
          next();
        }
      });
    }
  }]);

  return AC;
}();

exports.default = AC;