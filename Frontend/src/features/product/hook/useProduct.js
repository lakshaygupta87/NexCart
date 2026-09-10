import { addProductVariant, createProduct, getAllProducts, getProductById, getSellerProduct } from "../service/product.api";
import { sellerProducts, setProducts, setSellerProducts } from "../state/product.slice";
import { useDispatch } from "react-redux";

export const useProduct = () => {

    const dispatch = useDispatch()

    const handleCreateProduct = async (formData) => {
        const data = await createProduct(formData)
        return data.product
    }

    const handleGetSellerProduct = async () => {
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.products
    }

    const handleGetAllProducts = async () => {
        const data = await getAllProducts()
        dispatch(setProducts(data.products))
    }

    const handleGetProductById = async (productId) => {
        const data = await getProductById(productId)
        return data.product

    }

    const handleAddProductVariant = async (productId, newProductvariant)=>{
        const data = await addProductVariant(productId, newProductvariant)

        return data
    }

    return {
        handleCreateProduct, handleGetSellerProduct,
        handleGetAllProducts, handleGetProductById,
        handleAddProductVariant
    }
}