require("dotenv").config();
const data = require("./data");

const mongoose = require("mongoose");
const blogController = require("../modules/blogs/blog.controller");

const user1 = "65d5f21d98c0f2c16dbf89ed";
const user2 = "65d73707db8472beb91529f2";

const setup = {
  initialize: async () => {
    try {
      console.log("Starting Blog Seeding");
      console.log(data.length);
      await mongoose.connect(process.env.DB_URL);
      for (let i = 0; i < 10; i++) {
        const payload = data[i];
        payload.status = "published";
        payload.author = user1;
        payload.pictureUrl = `https://cdn.dummyjson.com/recipe-images/${
          i + 1
        }.webp`;
        await blogController.create(payload);
      }
      for (let i = 10; i < 20; i++) {
        const payload = data[i];
        payload.author = user2;
        payload.status = "published";
        payload.pictureUrl = `https://cdn.dummyjson.com/recipe-images/${
          i + 1
        }.webp`;
        await blogController.create(payload);
      }

      console.log("Completed Blog Seeding");
    } catch (e) {
      console.log({ e });
    }
  },
};

setup.initialize();
