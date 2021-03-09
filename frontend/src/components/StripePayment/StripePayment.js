
import StripeCheckout from 'react-stripe-checkout';

function StripePayment(props) {

  function handleToken(token,address){
    console.log("here is data", { token, address });
  }
  return(
    <StripeCheckout
      stripeKey="pk_test_51ISxqYIPvcR2SEMAc9j2gHUbMxhQDT6pSw91HWp5AFhBvrYTemkqn7MDqeVpfNXo6IzjI3lOXefnmNNWJSBXZ0D200UgfqFAUn"
      token={handleToken} amount={props.amount*100} name={props.name} email={props.email} />
    )
  }
export default StripePayment;