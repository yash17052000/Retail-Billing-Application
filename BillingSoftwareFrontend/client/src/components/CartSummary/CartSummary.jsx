import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import ReceiptPopup from '../ReceiptPopup/ReceiptPopup';
import { creatOrder, DeleteOrder } from '../../Service/Order.Service';
import { createRazorPayOrder, verifyOrder } from '../../Service/Payment.service';
import toast from 'react-hot-toast';

function CartSummary({
  setCustomerDetails,
  customerDetails
}) {
  const { cartItems, clearcart } = useContext(AppContext)
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
 
  
  const clearAll = () => {
    setCustomerDetails({
      ...customerDetails,
      mobileNumber: "",
      customerName: ""
    })
    clearcart()
  }
  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const handlePrintReceipt = () => {
    window.print();
  };
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    })
  }


  const deleteOrderOnFailure = (id) => {
    DeleteOrder(id).subscribe({
      next: () => {
        toast.success("deleted successfully")
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })
  }

  const AddRozarpayOrder = (data) => {
    createRazorPayOrder(data).subscribe({
      next: (res) => {
   
        
        const razorPayresponse=res.data
         const options = {
            key: "123ihihijh",
            amount: razorPayresponse.amount,
            currency: razorPayresponse.currency,
            order_id: razorPayresponse.id,
            name: "My Retail Shop",
            description: "Order payment",
            handler: (res) => verifyPaymentHandler(res, savedData),
            prefill: {
              name: customerDetails.customerName,
              contact: customerDetails.mobileNumber
            },
            theme: {
              "color": "#F37254"
            }
          }
          var rzp1 = new Razorpay(options);
          //rzp1.open()
         
        toast.success("Added successfully")
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })
  }


  const verifyPaymentHandler =  (response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId
    };
  
    
    verifyOrder(paymentData).subscribe({
      next: (res) => {
        if (response.status === 200) {
          toast.success("Payment successful");

          setOrderDetails({
            ...savedOrder,
            paymentDetails: {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            }
          });
        }
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })
  };

  const completePayment =  (paymentMode) => {
    if (!customerDetails.customerName || !customerDetails.mobileNumber) {
      toast.error("Please enter customer details");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsProcessing(true);
    const orderData = {
      customerName: customerDetails.customerName,
      phoneNumber: customerDetails.mobileNumber,
      cartItems: cartItems,
      subtotal: totalAmount,
      tax,
      grandTotal,
     paymentMethod: paymentMode.toUpperCase()
    }
    
    
    creatOrder(orderData).subscribe({
      next: (response) => {
        const savedData = response.data;
console.log("This is customerdetails",orderData,savedData);
        if (response.status === 201 && paymentMode === "cash") {
          toast.success("Cash received");
          setOrderDetails(savedData);
          setIsProcessing(false)

        } else if (response.status === 201 && paymentMode === "upi") {
          const razorpayLoaded = loadRazorpayScript();
           setOrderDetails(savedData);
            setIsProcessing(false)
          if (!razorpayLoaded) {
            toast.error('Unable to load razorpay');
            deleteOrderOnFailure(savedData.orderId);
            return;
          }

        
          AddRozarpayOrder({amount:grandTotal, currency:"INR"})
         
        }
      },
      error: (error) => console.log("This is error", error),
      complete: console.log("complete")
    })

  }



  return (
    <div className="mt-2">
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Item: </span>
          <span className="text-light">₹{totalAmount.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Tax (1%): </span>
          <span className="text-light">₹{tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-4">
          <span className="text-light">Total: </span>
          <span className="text-light">₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="d-flex gap-3">
        <button className="btn btn-success flex-grow-1"
          onClick={() => completePayment("cash")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button className="btn btn-primary flex-grow-1"
          onClick={() => completePayment("upi")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "UPI"}
        </button>
      </div>
      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-warning flex-grow-1"
          onClick={placeOrder}
         
        >
          Place Order
        </button>
      </div>
      {
  showPopup && (
    <ReceiptPopup
      orderDetails={{
        ...orderDetails,
        razorpayOrderId: "",
        razorpayPaymentId:  ""
      }}
      onClose={()  => setShowPopup(false)}
      onPrint={handlePrintReceipt}
    />
  )
}
    </div>
  )
}

export default CartSummary
