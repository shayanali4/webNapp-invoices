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
    const  paymentIntent=res.data;
    console.log(  "lali", paymentIntent)

      const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: 'shayanali4@live.com',
          },
        }
      });
  
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log("hello from error",result.error.message);
      } else {
        alert(`You have successfully paid $${props.pay} using Stripe`)
        console.log("hello from success");
        const payDate = GetFormattedDate()
        const tempData = {
          _id: invoice.selectedInvoice._id,
          payValue: props.pay,
          payMethod: 'stripe',
          payDate: payDate
        }
        dispatch(updatePaymentDetails(tempData._id,tempData.payMethod,tempData.payValue,tempData.payDate));
        // The payment has been processed!
        if (result.paymentIntent.status === 'succeeded') {

         console.log("data agy")
        }
      }
  };
    const GetFormattedDate=()=> {
    var todayTime = new Date();
    var month = todayTime.getMonth()+1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var hours = todayTime.getHours();
    var minutes = todayTime.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return day + "/" + month + "/" + year + " , " + strTime;
  }
     return (
         
         <div className="stripe-payment">
            <h5>Enter Card Details</h5>
             <CardElement options={CARD_ELEMENT_OPTIONS} />
         <button onClick={() => handleSubmit()}>Pay ${props.pay}</button>
        </div>




    )
}
export default StripeCard;
