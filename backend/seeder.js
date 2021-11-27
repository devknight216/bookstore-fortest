import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
// import products from './data/products.json'
import users from './data/users.js'
import Order from './models/orderModel.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'


import { createRequire } from "module";
const require = createRequire(import.meta.url);
const products = require("./data/products.json");

dotenv.config()
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const importedProducts = products.map(product => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(importedProducts)

        console.log('Data imported!'.bgGreen);
        process.exit()
    } catch (error) {
        console.log(`Error while importing data: ${error}`.red.bold);
        process.exit(1)
    }
}

const deleteData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        console.log('Data destroyed!'.bgGreen);
        process.exit()
    } catch (error) {
        console.log(`Error while deleting data: ${error}`.red.bold);
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    deleteData()
}else {
    importData()
}