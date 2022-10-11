import { Router } from "express";
import { db }from "../utils/db.js"

const productRouter = Router();

productRouter.get("/", async (req, res) => {       //  get
    let collection = db.collection("products")
    let products =  await collection.find({ status: req.status}) .sort({ published_at: -1}).toArray();

    return res.json({
        data:products,
    });
});

productRouter.get("/:id", async (req, res) => {      //ของ get id
    let collection = db.collection("products");
    let productId =ObjectId(req.params.id)
    //console.log(productId);
    let products = await collection.find({_id: productId}).toArray();

    return res.json({data: products})
});      

productRouter.post("/", async  (req, res) => {      // post
    let collection = db.collection("products")
    let productsData ={
        ...req.body,
        published_at: new Date(),
    };

    let newProducts = await collection.insertOne(productsData)
    console.log(newProducts)


    return res.json({
        message: `$Post ${newProducts.insertedId} has been created.`
    });
});

productRouter.put("/:id", async (req, res) => {     // put
    let collection = ab.collection("products");
    let productId = ObjectId(req.params.id);
    let updateProducts = {...req.body}

    await collection.updateOne({_id: productId}, {$set: updateProducts})

    return res.json({
        message: `Product ${newProducts.insertedId} has been created. `
    });
});

productRouter.delete("/:id", async (req, res) => {      //ของ delete id
    let collection = db.collection("products");
    let productId =ObjectId(req.params.id) 
    //console.log(productId);
     await collection.deleteOne({_id: productId});

    return res.json({ message:`Product${productId} has been created.`})
});      

   


export default productRouter;
