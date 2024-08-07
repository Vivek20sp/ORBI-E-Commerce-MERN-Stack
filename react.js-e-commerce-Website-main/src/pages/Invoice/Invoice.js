import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Invoice = () => {
    const CartItems = JSON.parse(localStorage.getItem('CartItems'));
    const reduxProducts = useSelector((state) => state.orebiReducer.products);
    const [totalAmt, setTotalAmt] = useState("");
    const [shippingCharge, setShippingCharge] = useState("");
    const usersProduct = [];
    const userInfo = JSON.parse(localStorage.getItem('UserProfile'));
    const generateARandomNumber = Math.floor(Math.random(100000) * 100000);

    useEffect(() => {
        let price = 0;
        CartItems.map((item) => {
            price += item.price * item.quantity;
            return price;
        });
        setTotalAmt(price);
        // eslint-disable-next-line
    }, [CartItems]);
    useEffect(() => {
        if (totalAmt <= 200) {
            setShippingCharge(30);
        } else if (totalAmt <= 400) {
            setShippingCharge(25);
        } else if (totalAmt > 401) {
            setShippingCharge(20);
        }
        // eslint-disable-next-line
    }, [totalAmt]);

    return (
        <div>
            <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto my-5">
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center mr-1">
                        <img class="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                            alt="Logo" />
                        <div class="text-gray-700 font-semibold text-lg">ORBI</div>
                    </div>
                    <div class="text-gray-700">
                        <div class="font-bold text-xl mb-2">INVOICE</div>
                        <div class="text-sm">Date: {Date()}</div>
                        <div class="text-sm">Invoice #: INV{generateARandomNumber}</div>
                    </div>
                </div>
                <div class="border-b-2 border-gray-300 pb-8 mb-8">
                    <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
                    <div class="text-gray-700 mb-2">{userInfo.name}</div>
                    <div class="text-gray-700 mb-2">{userInfo.address}</div>
                    <div class="text-gray-700">{userInfo.email}</div>
                </div>
                <table class="w-full text-left mb-8">
                    <thead>
                        <tr>
                            <th class="text-gray-700 font-bold uppercase py-2">Description</th>
                            <th class="text-gray-700 font-bold uppercase py-2">Quantity</th>
                            <th class="text-gray-700 font-bold uppercase py-2">Price</th>
                            <th class="text-gray-700 font-bold uppercase py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(CartItems.map((item) => {
                            return (
                                <tr>
                                    <td class="py-4 text-gray-700">{item.name}</td>
                                    <td class="py-4 text-gray-700">{item.quantity}</td>
                                    <td class="py-4 text-gray-700">Rs {item.price}.00</td>
                                    <td class="py-4 text-gray-700">Rs {item.price}.00</td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>
                <div class="flex justify-end mb-8">
                    <div class="text-gray-700 mr-2">Subtotal:</div>
                    <div class="text-gray-700">Rs {totalAmt}.00</div>
                </div>
                <div class="text-right mb-8">
                    <div class="text-gray-700 mr-2">Tax:</div>
                    <div class="text-gray-700">Rs {shippingCharge}.00</div>

                </div>
                <div class="flex justify-end mb-8">
                    <div class="text-gray-700 mr-2">Total:</div>
                    <div class="text-gray-700 font-bold text-xl">Rs {shippingCharge + totalAmt}.00</div>
                </div>
                <div class="border-t-2 border-gray-300 pt-8 mb-8">
                    <div class="text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div>
                    <div class="text-gray-700 mb-2">Please make checks payable to ORBI and mail to:orbi_customerHelp@orbi.com</div>
                    <div class="text-gray-700">{userInfo.address}</div>
                </div>
            </div>
        </div>
    )
}

export default Invoice
