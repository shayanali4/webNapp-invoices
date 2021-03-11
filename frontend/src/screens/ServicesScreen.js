import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newservice, serviceList } from "../actions/invoiceActions";
import Header from "../components/Header";
import MessageBox from "../components/MessageBox";

function ServicesScreen(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin; 

  const servicesInfo = useSelector((state) => state.serviceInfo);

  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [price, setPrice] = useState('');
  const [messageFlag, setMessageFlag] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(newservice(shortDescription, longDescription, price));
    setTimeout(()=>{setMessageFlag(true)},1000)
    setShortDescription('');
    setLongDescription('');
    setPrice('');
    setTimeout(()=>{setMessageFlag(false)},3000)
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
    <>
      <Header />
    <div id="pages_maincontent">
        <h2 className="page_title" >  
        <i onClick={props.history.goBack} className="fa fa-chevron-left back-ico" aria-hidden="true"></i>
        <i className="fa fa-plus" aria-hidden="true" />
          &nbsp;Invoice Services:
          </h2>
      <h3 id="dvResellerName">
        See Our services
      </h3>
      <div className="container-fluid1 container-fluid1">     
          <div className="row">
            {messageFlag ?
                        <MessageBox variant='success'>Service Added</MessageBox> : <></>}
            
          <div className="col-md-12 ">
            {servicesInfo.servicesList ?
              <>
                {/* <h5>Services List :</h5> */}
                <ul className=" list1">
              
              {servicesInfo.servicesList.map((v, i) =>
                <li   className="list1" key={i}>

                <div className="details details1" >
                  <div><b>{v.shortDescription}</b></div>
                  <div className="space" >
                      {v.longDescription}
                    </div>
                </div>
                <div className="actions">
           < b>    ${v.price}</b>
                </div>
              </li>
              )}        
            </ul></>
             : <></>}
            <form onSubmit={submitHandler}>
                        {/* <div className="form-group form-group1">
                          <label htmlFor="exampleFormControlTextarea1">Invoice Footer: &ensp;  &ensp;</label>
                          <textarea placeholder="Invoice Footer Details" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                        </div> */}
              <div className="form-group form-group1">     
                <label htmlFor="exampleFormControlTextarea1"><b>Service Short Description:</b></label>
                <textarea required value={shortDescription} onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Service Short Description" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
              </div>
              <div className="form-group form-group1">               
                <label htmlFor="exampleFormControlTextarea1"><b>Service Long Description:</b></label>               
                <textarea required value={longDescription} onChange={(e) => setLongDescription(e.target.value)}
                  placeholder="Service Long Description" className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />              
              </div>              
              <div className="form-group form-group1">                
                <label htmlFor="exampleInputEmail1"><b>Service Price:</b></label>               
                <input required value={price} onChange={(e) => setPrice(e.target.value)}
                  type="number" placeholder="Price" className="input1" id="exampleInputEmail1" aria-describedby="emailHelp" />                
              </div>              
              <button type="submit" className="btn btn-primary">Add Service</button>
            </form>          
          </div>          
        </div>        
      </div>      
      </div>
      </>
    );
  }
export default ServicesScreen;