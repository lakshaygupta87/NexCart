import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import CreateProduct from "../features/product/pages/CreateProduct";
import Dashboard from "../features/product/pages/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/product/pages/Home";
import ProductDetail from "../features/product/pages/ProductDetails";
import SellerProductDetails from "../features/product/pages/SellerProductDetails";
import Cart from "../features/cart/pages/Cart";
import AppLayout from "./AppLayout";
import OrderSuccess from "../features/cart/pages/OrderSuccess";

export const routes = createBrowserRouter([
  
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },

    {
        element: <AppLayout />,
        children: [

            {
                path: "/",
                element: <Home />,
            },

            // =========================
            // BUYER PRODUCT DETAIL
            // Seller cannot access this
            // =========================
            {
                path: "/product/:productId",
                element: (
                    <Protected role="buyer">
                        <ProductDetail />
                    </Protected>
                ),
            },

            // =========================
            // BUYER CART
            // Seller cannot access this
            // =========================
            {
                path: "/cart",
                element: (
                    <Protected role="buyer">
                        <Cart />
                    </Protected>
                ),
            },

            // =========================
            // BUYER ORDER SUCCESS
            // Seller cannot access this
            // =========================
            {
                path: "/order-success",
                element: (
                    <Protected role="buyer">
                        <OrderSuccess />
                    </Protected>
                ),
            },

            // =========================
            // SELLER ROUTES
            // =========================
            {
                path: "/seller",
                children: [

                    // CREATE PRODUCT
                    {
                        path: "/seller/create-product",
                        element: (
                            <Protected role="seller">
                                <CreateProduct />
                            </Protected>
                        ),
                    },

                    // SELLER DASHBOARD
                    {
                        path: "/seller/dashboard",
                        element: (
                            <Protected role="seller">
                                <Dashboard />
                            </Protected>
                        ),
                    },

                    // SELLER PRODUCT DETAILS
                    {
                        path: "/seller/product/:productId",
                        element: (
                            <Protected role="seller">
                                <SellerProductDetails />
                            </Protected>
                        ),
                    },
                ],
            },
        ],
    },
]);