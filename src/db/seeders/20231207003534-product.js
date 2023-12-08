const axios = require("axios");

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      const response = await axios.get("https://dummyjson.com/products");
      const apiProducts = response.data.products;

      const seedData = apiProducts.map((item) => ({
        id: crypto.randomUUID(),
        productName: item.title,
        price: item.price,
        description: item.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await queryInterface.bulkInsert("Products", seedData, {});
    } catch (error) {
      throw new Error(error.message);
    }

    await queryInterface.bulkInsert(
      "Products",
      [
        {
          id: crypto.randomUUID(),
          productName: "Buku Tulis",
          price: 20.0,
          description: "Ini adalah sebuah buku tulis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          productName: "Buku Gambar",
          price: 22.0,
          description: "Ini adalah sebuah buku gambar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          productName: "Pulpen",
          price: 15.0,
          description: "Ini adalah sebuah pulpen untuk menulis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: crypto.randomUUID(),
          productName: "Pensil",
          price: 12.0,
          description: "Ini adalah sebuah pensil untuk menggambar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
