const e = require("express");
const express = require("express");
const SellBuy = require("../mongoose/models/sellBuy")
const url = require('url');

// setting up the router
const sellAndBuyRouter = new express.Router();

//Get method for sellProduct
sellAndBuyRouter.get("/sellProduct", (req, res) => {
    if (req.query.product != undefined) {
        var query = req.query.product;
    }
    if (req.query.sortBy != undefined) {
        var query = req.query.sortBy;
    }
    if (req.query.sortBy === undefined && req.query.product === undefined) {
        var query = "all";
    }
    switch (query) {
        case "lowerCostPrice":
            SellBuy
                .find({})
                .sort({ costPrice: 1 })
                .then((result) => {
                    res.status(200).send(result)
                })
                .catch((err) => {
                    res.status(400).send();
                });
            break;
        case "higherCostPrice":
            SellBuy
                .find({})
                .sort({ costPrice: -1 })
                .then((result) => {
                    res.status(200).send(result)
                })
                .catch((err) => {
                    res.status(400).send();
                });
            break;
        case "lowerSoldPrice":
            SellBuy
                .find({})
                .sort({ soldPrice: 1 })
                .then((result) => {
                    res.status(200).send(result)
                })
                .catch((err) => {
                    res.status(400).send();
                });
            break;
        case "higherSoldPrice":
            SellBuy
                .find({})
                .sort({ soldPrice: -1 })
                .then((result) => {
                    res.status(200).send(result)
                })
                .catch((err) => {
                    res.status(400).send();
                });
            break;
        case "all":
            SellBuy
                .find({}, (err, docs) => {
                    if (err) {
                        res.status(400).send();
                    }
                    res.status(200).send(docs)
                })
            break;
        default:
            SellBuy
                .find({ productName: query }, (err, docs) => {
                    if (err) {
                        res.status(400).send();
                    }
                    res.status(200).send(docs)
                })
    }
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
                    res.status(400).send({ error: err.errors[field].message });
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
                res.status(400).send({ error: err.errors[field].message });
            }
        }
        else {
            res.status(200).send({ result: updatedProduct, message: "Updated Successfully" })
        }
    })
})
//Delete method for sellProduct:id
sellAndBuyRouter.delete("/sellProduct/:id", (req, res) => {
    const filter = { _id: req.params.id };
    var updatedProduct = SellBuy.deleteOne(filter, { new: true, runValidators: true }, (err, updatedProduct) => {
        if (err) {
            res.status(400).send();
        }
        else {
            res.status(200).send({ result: updatedProduct, message: "Deleted successfully" })
        }
    })
})

// exporting the router
module.exports = sellAndBuyRouter;


