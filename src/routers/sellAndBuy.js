const e = require("express");
const express = require("express");
const SellBuy = require("../mongoose/models/sellBuy")

// setting up the router
const sellAndBuyRouter = new express.Router();

// code goes here for routes
//post method for sellProduct
sellAndBuyRouter.get("/sellProduct", (req, res) => {
    const newProduct = new SellBuy({
        productName: req.body.productName,
        costPrice: req.body.costPrice
    })
    newProduct
        .save()
        .then((result) => {
            res.status(201).send({ result: result, message: "Product Added" })
        })
        .catch((err) => {
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    res.status(400).send(err.errors[field].message);
                }
            }
        });
})
//post method for sellProduct
sellAndBuyRouter.post("/sellProduct", (req, res) => {
    const newProduct = new SellBuy({
        productName: req.body.productName,
        costPrice: req.body.costPrice
    })
    newProduct
        .save()
        .then((result) => {
            res.status(201).send({ result: result, message: "Product Added" })
        })
        .catch((err) => {
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    res.status(400).send(err.errors[field].message);
                }
            }
        });
})
//Patch method for sellProduct:id
sellAndBuyRouter.get("/sellProduct:id", (req, res) => {
    const newProduct = new SellBuy({
        productName: req.body.productName,
        costPrice: req.body.costPrice
    })
    newProduct
        .save()
        .then((result) => {
            res.status(201).send({ result: result, message: "Product Added" })
        })
        .catch((err) => {
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    res.status(400).send(err.errors[field].message);
                }
            }
        });
})

// exporting the router
module.exports = sellAndBuyRouter;


