import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { updatePaymentDetails } from '../../actions/invoiceActions';
import { serverAddress } from '../../constants/dbConstants';

const CARD_ELEMENT_OPTIONS = {
   hidePostalCode:true,
    style: {
      base: {
        color: '#fff',
        fontWeight: 600,
        fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased', ':focus': { color: '#424770', },
        '::placeholder': {
          color: '#9BACC8',
        }, ':focus::placeholder': {
          color: '#CFD7DF',
        },
      },
      invalid: {
        color: '#fff',
        ':focus': { color: '#FA755A', },
        '::placeholder': { color: '#FFCCA5', },
      },
      },
    };
function StripeCard(props) {
    const user = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo'))
        : null;
    const companyId = user.companyId;
      const invoice = useSelector(state => state.invoiceInfo);
      const stripe = useStripe();
      const elements = useElements();
      const dispatch = useDispatch();
      
    const handleSubmit = async (event) => {
    console.log("chal rha h")  
  
      if (!stripe || !elements) {
      
        return;
      }
  

      const res = await axios.post(`${serverAddress}/pay`, {
        _id: invoice.selectedInvoice._id,
        companyId,
        email: props.email,
        payAmount: props.pay,
        paidAmount: props.paidAmount,
        
      })
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
        dispatch(updatePaymentDetails(invoice.selectedInvoice._id, [...invoice.selectedInvoice.paymentList,{payValue:props.pay,payMethod:'stripe',date:clientSecret.date}]));
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
