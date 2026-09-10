import productModel from "../models/product.model.js";


export const stockOfVariant = async(productID,variantId) =>{
    const product = await productModel.findOne({
        _id:productID,
        "variants._id":variantId
    })

    const stock = product.variants.find(variant=> variant._id.toString() === variantId).stock

    return stock
}