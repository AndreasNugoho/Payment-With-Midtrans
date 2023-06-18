'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addConstraint("Orders", {
    //   fields: ['tiket_id'],
    //   type: "foreign key",
    //   name: "tiket_fk",
    //   references: {
    //     table: "Tikets",
    //     field:"id"
    //   },
    //   onDelete: "CASCADE",
    //   onUpdate:"CASCADE"
    // })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeConstraint("Orders", 'tiket_fk')
  }
};
