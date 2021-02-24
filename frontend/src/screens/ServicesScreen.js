import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newservice, serviceList } from "../actions/invoiceActions";

function ServicesScreen(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin; 

  const servicesInfo = useSelector((state) => state.serviceInfo);

  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(newservice(shortDescription, longDescription, price));
    setShortDescription('');
    setLongDescription('');
    setPrice('');
  }

  useEffect(() => {
    dispatch(serviceList());
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      props.history.push('/');
    }
  }, [props.history, userInfo]);


  return (
    <div id="pages_maincontent">
      <h2 className="page_title" >  
        <i className="fa fa-plus" aria-hidden="true" />
          &nbsp;Invoice Services:
          </h2>
      <h3 id="dvResellerName">
        See Our services
      </h3>
      <div className="container-fluid1 container-fluid1">     
        <div className="row">      
          <div className="col-md-12 ">
            {servicesInfo.servicesList ?
              <table style={{ width: '100%', border: '1px solid' }}>
                {servicesInfo.servicesList.length!==0 ?
                  <tbody>
                    <tr >
                      <th>Short Descriptoin</th>
                      <th>Long Description</th>
                      <th>Price</th>
                    </tr>
                    {servicesInfo.servicesList.map((v, i) =>
                      <tr >
                        <td>{v.shortDescription}</td>
                        <td>{v.longDescription}</td>
                        <td>{v.price}</td>
                      </tr>
                    )}
                  </tbody> : <></>}
              </table> : <></>}
            <form onSubmit={submitHandler}>
                        {/* <div className="form-group form-group1">
                          <label htmlFor="exampleFormControlTextarea1">Invoice Footer: &ensp;  &ensp;</label>
                          <textarea placeholder="Invoice Footer Details" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                        </div> */}
              <div className="form-group form-group1">     
                <label htmlFor="exampleFormControlTextarea1">Service Short Description:</label>
                <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Service Short Description" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
              </div>
              <div className="form-group form-group1">               
                <label htmlFor="exampleFormControlTextarea1">Service Long Description:</label>               
                <textarea value={longDescription} onChange={(e) => setLongDescription(e.target.value)}
                  placeholder="Service Long Description" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />              
              </div>              
              <div className="form-group form-group1">                
                <label htmlFor="exampleInputEmail1">Service Price:</label>               
                <input value={price} onChange={(e) => setPrice(e.target.value)}
                  type="number" placeholder="Price" className="input1" id="exampleInputEmail1" aria-describedby="emailHelp" />                
              </div>              
              <button type="submit" className="btn btn-primary">Update</button>
            </form>          
          </div>          
        </div>        
      </div>      
    </div>
    );
  }
export default ServicesScreen;