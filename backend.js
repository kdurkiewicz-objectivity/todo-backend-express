const crypto = require('crypto');

module.exports = function createTodoBackend() {
  let data = [];

  return {
    all: function(callback) {
      callback(null, data);
    },

    get: function(id, callback) {
      callback(null, data.find(item => item.id === id));
    },

    create: function(title, order, callback) {
      const newItem = { title, order, id: crypto.randomUUID() };
      data = data.concat([newItem])
      callback(null, newItem);
    },

    update(id, properties, callback) {
      data = data.map((item) => item.id === id ? { ...item, ...properties } : item);
      callback(null, data.find(item => item.id === id));
    },

    delete: function(id, callback) {
      data = data.filter(item => item.id !== id);
      callback(null, true);
    },

    clear: function(callback) {
      data = [];
      callback(null, true);
    }
  };
};
