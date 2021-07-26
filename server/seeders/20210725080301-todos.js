'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', [{
      text: 'Finish the assignment',
      completed: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      text: 'Calling a fried',
      completed: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      text: '1 Hour online course',
      completed: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
