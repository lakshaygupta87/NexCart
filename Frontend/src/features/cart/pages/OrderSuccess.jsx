import { useLocation, Link } from 'react-router'
import { useCart } from '../hook/useCart'
import { useEffect, useState } from 'react'


const tokens = {
    surface: '#fbf9f6',
    surfaceLow: '#f5f3f0',
    surfaceHigh: '#eae8e5',
    onSurface: '#1b1c1a',
    onSurfaceVariant: '#4d463a',
    secondary: '#7A6E63',
    primary: '#C9A96E',
    primaryDark: '#745a27',
    outlineVariant: '#d0c5b5',
    outline: '#7f7668',
}


const OrderSuccess = () => {

    const location = useLocation()
    const { handleGetOrderDetails } = useCart()

    const queryParams = new URLSearchParams(location.search)
    const orderId = queryParams.get("order_id")

    const [order, setOrder] = useState(null)

    useEffect(() => {

        const fetchOrder = async () => {

            try {

                const orderData = await handleGetOrderDetails(orderId)

                console.log("ORDER DATA FROM BACKEND:", orderData)

                setOrder(orderData)

            } catch (error) {

                console.error("Failed to fetch order:", error)

            }

        }

        if (orderId) {
            fetchOrder()
        }

    }, [orderId])


    // Loading state
    if (!order) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{
                    backgroundColor: tokens.surface,
                    fontFamily: "'Inter', sans-serif"
                }}
            >
                <p
                    className="text-sm uppercase tracking-[0.2em]"
                    style={{ color: tokens.secondary }}
                >
                    Loading order...
                </p>
            </div>
        )
    }


    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen pb-24"
                style={{
                    backgroundColor: tokens.surface,
                    fontFamily: "'Inter', sans-serif"
                }}
            >

                <main className="pt-12 lg:pt-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* LEFT SIDE */}
                        <div className="lg:col-span-7 space-y-12">

                            {/* Success Message */}
                            <section className="space-y-6">

                                <span
                                    className="uppercase tracking-[0.2em] text-[10px]"
                                    style={{ color: tokens.secondary }}
                                >
                                    Payment Successful
                                </span>

                                <h1
                                    className="text-5xl md:text-7xl leading-tight font-light tracking-tight"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', serif",
                                        color: tokens.onSurface
                                    }}
                                >
                                    Your order has
                                    <br />
                                    <i className="italic">been placed.</i>
                                </h1>

                                <div className="space-y-2 mt-6">

                                    <p
                                        className="text-sm uppercase tracking-widest"
                                        style={{ color: tokens.outline }}
                                    >
                                        Order Reference
                                    </p>

                                    <p
                                        className="text-2xl break-all"
                                        style={{
                                            fontFamily: "'Cormorant Garamond', serif",
                                            color: tokens.primaryDark
                                        }}
                                    >
                                        #{order.razorpay.orderId}
                                    </p>

                                </div>

                                <div
                                    className="inline-block px-4 py-2 text-xs uppercase tracking-widest"
                                    style={{
                                        backgroundColor: tokens.surfaceLow,
                                        color: tokens.primaryDark
                                    }}
                                >
                                    {order.status}
                                </div>

                            </section>


                            {/* Order Items */}
                            <section
                                className="p-8 md:p-12 space-y-8"
                                style={{
                                    backgroundColor: tokens.surfaceLow
                                }}
                            >

                                <h3
                                    className="text-xl pb-4"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', serif",
                                        borderBottom: `1px solid ${tokens.outlineVariant}`
                                    }}
                                >
                                    Order Summary
                                </h3>


                                <div className="space-y-8">

                                    {order.orderItems.map((item) => {

                                        const imageUrl =
                                            item.images?.length > 0
                                                ? item.images[0].url
                                                : null

                                        const itemTotal =
                                            item.price.amount * item.quantity

                                        return (
                                            <div
                                                key={item._id}
                                                className="flex gap-6"
                                            >

                                                {/* Product Image */}
                                                <div
                                                    className="w-24 h-32 flex-shrink-0 overflow-hidden"
                                                    style={{
                                                        backgroundColor: tokens.surfaceHigh
                                                    }}
                                                >

                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <span
                                                                className="text-xs"
                                                                style={{ color: tokens.muted }}
                                                            >
                                                                No Image
                                                            </span>
                                                        </div>
                                                    )}

                                                </div>


                                                {/* Product Information */}
                                                <div className="flex-grow space-y-2">

                                                    <h4
                                                        className="text-lg"
                                                        style={{
                                                            fontFamily: "'Cormorant Garamond', serif",
                                                            color: tokens.onSurface
                                                        }}
                                                    >
                                                        {item.title}
                                                    </h4>

                                                    <p
                                                        className="text-sm"
                                                        style={{
                                                            color: tokens.secondary
                                                        }}
                                                    >
                                                        {item.description}
                                                    </p>

                                                    <div
                                                        className="text-xs uppercase tracking-widest"
                                                        style={{
                                                            color: tokens.outline
                                                        }}
                                                    >
                                                        Quantity: {item.quantity}
                                                    </div>

                                                    <p
                                                        className="font-semibold mt-3"
                                                        style={{
                                                            color: tokens.onSurface
                                                        }}
                                                    >
                                                        {item.price.currency}{" "}
                                                        {itemTotal.toLocaleString()}
                                                    </p>

                                                </div>

                                            </div>
                                        )

                                    })}

                                </div>


                                {/* Price Summary */}
                                <div
                                    className="space-y-4 pt-6"
                                    style={{
                                        borderTop: `1px solid ${tokens.outlineVariant}`
                                    }}
                                >

                                    <div
                                        className="flex justify-between text-sm uppercase tracking-widest"
                                        style={{ color: tokens.secondary }}
                                    >
                                        <span>Items</span>

                                        <span>
                                            {order.orderItems.reduce(
                                                (total, item) => total + item.quantity,
                                                0
                                            )}
                                        </span>
                                    </div>


                                    <div
                                        className="flex justify-between text-sm uppercase tracking-widest"
                                        style={{ color: tokens.secondary }}
                                    >
                                        <span>Shipping</span>

                                        <span>Complimentary</span>
                                    </div>


                                    <div
                                        className="flex justify-between text-lg pt-2"
                                        style={{
                                            fontFamily: "'Cormorant Garamond', serif"
                                        }}
                                    >

                                        <span>Total Paid</span>

                                        <span style={{ color: tokens.primaryDark }}>
                                            {order.price.currency}{" "}
                                            {order.price.amount.toLocaleString()}
                                        </span>

                                    </div>

                                </div>

                            </section>

                        </div>


                        {/* RIGHT SIDE */}
                        <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-12 mt-12 lg:mt-0">

                            <div className="space-y-8">

                                {/* Payment Information */}
                                <div className="space-y-4">

                                    <h3
                                        className="text-xl italic"
                                        style={{
                                            fontFamily: "'Cormorant Garamond', serif"
                                        }}
                                    >
                                        Payment Details
                                    </h3>

                                    <div
                                        className="space-y-3 text-sm"
                                        style={{
                                            color: tokens.onSurfaceVariant
                                        }}
                                    >

                                        <div className="flex justify-between">
                                            <span>Payment Status</span>

                                            <span className="font-medium capitalize">
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="flex justify-between gap-4">
                                            <span>Payment ID</span>

                                            <span className="text-right break-all">
                                                {order.razorpay.paymentId}
                                            </span>
                                        </div>

                                    </div>

                                </div>


                                {/* Actions */}
                                <div className="flex flex-col gap-4 pt-4">

                                    <Link
                                        to="/"
                                        className="py-5 px-8 text-center text-xs uppercase tracking-[0.2em] transition-all duration-300"
                                        style={{
                                            backgroundColor: tokens.primaryDark,
                                            color: '#ffffff'
                                        }}
                                    >
                                        Continue Shopping
                                    </Link>

                                </div>

                            </div>


                            {/* Simple Confirmation */}
                            <div
                                className="pt-8"
                                style={{
                                    borderTop: `1px solid ${tokens.outlineVariant}40`
                                }}
                            >

                                <p
                                    className="text-[10px] uppercase tracking-widest leading-loose"
                                    style={{ color: tokens.outline }}
                                >
                                    Your payment has been successfully verified.
                                    Your order details are shown above.
                                </p>

                            </div>

                        </div>

                    </div>

                </main>

            </div>
        </>
    )
}

export default OrderSuccess

