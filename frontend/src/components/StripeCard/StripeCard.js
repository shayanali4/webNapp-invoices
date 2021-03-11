import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios'

 const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
 function StripeCard(props) {
      const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
    console.log("chal rha h")  
  
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
         
         <div className="stripe-payment">
            <h5>Enter Card Details</h5>
             <CardElement options={CARD_ELEMENT_OPTIONS} />
         <button onClick={() => handleSubmit()}>Pay ${props.pay}</button>
        </div>




    )
}
export default StripeCard;
