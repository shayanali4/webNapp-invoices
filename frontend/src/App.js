import AppRouter from './config/AppRouter'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51ISxqYIPvcR2SEMA6DN2wyJ4Uo6GsAogk7AdTqfdQTeXNI8BDGmCfKHLUIUiRNcIgwirsoY28coJMQF5j8rVzATe00cNJ7F8P1');

function App() {
  return (
    <div className="view view-main">
      <div className="pages">
        <div data-page="about" className="page">
          <div className="page-content">
            <Elements stripe={stripePromise}>
              <AppRouter />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
