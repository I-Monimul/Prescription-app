import Store from 'store2';

var store = function () {
  var self = this;
  self.store = Store.namespace('pr_on_admin');
  return self.store;
}

export default new store();