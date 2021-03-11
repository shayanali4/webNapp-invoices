
import {React,useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios'
import StripeCard from './StripeCard/StripeCard';
function  Payment() {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
console.log("chal rha h")  
    event.preventDefault();
  
      if (!stripe || !elements) {
      
        return;
      }
  

const res=  await axios.post("http://localhost:5000/pay",{email:"sahheher"})
 const  clientSecret=res.data["client_secret"];
console.log(  "lali", clientSecret)

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: 'Jenny Rosen',
          },
        }
      });
  
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {
         console.log("data agy")
        }
      }
    };
  
    return (
        <>
        <StripeCard/>
        <button onClick={handleSubmit}>pay</button>
        </>
    );
  }
  export default Payment;