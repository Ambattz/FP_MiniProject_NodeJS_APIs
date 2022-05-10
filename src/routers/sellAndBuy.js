const e = require("express");
const express = require("express");
const SellBuy = require("../mongoose/models/sellBuy")

// setting up the router
const sellAndBuyRouter = new express.Router();

//Get method for sellProduct
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
//Post method for sellProduct
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
sellAndBuyRouter.patch("/sellProduct/:id", (req, res) => {
    const filter = { _id: req.params.id };
    const update = { soldPrice: req.body.soldPrice };
    var updatedProduct = SellBuy.findOneAndUpdate(filter, update, { new: true, runValidators: true }, (err, updatedProduct) => {

        if (err) {
            for (field in err.errors) {
                res.status(400).send(err.errors[field].message);
            }
        }
        else {
            res.status(200).send({ result: updatedProduct, message: "Updated Successfully" })
        }
    })
})

// exporting the router
module.exports = sellAndBuyRouter;


