import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serviceList, newInvoice } from "../actions/invoiceActions";
import Header from "../components/Header";

function InvoiceDetailsScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;  
  // const [services, setServices] = useState([]);

  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [price, setPrice] = useState(0);

  const [serviceIndex, setServiceIndex] = useState();
  // const [invoice, setInvoice] = useState({});
  const [selectedService, setSelectedService] = useState({
    shortDescription: '',
    longDescription: '',
    price: 0,
    itemNumber:0
  });
  let tempService = {};
  const [itemNumber, setItemNumber] = useState(0);
  const [listItems, setListItems] = useState([]);
  const servicesInfo = useSelector((state) => state.serviceInfo);
  if (servicesInfo.servicesList) {
    // console.log("services", servicesInfo.servicesList)
    // setServices(servicesInfo.servicesList);
  }

  const selectedClient = useSelector((state) => state.choosenClientInfo);
  const { choosenClient } = selectedClient;    
  const dispatch = useDispatch();


  useEffect(() => {
    if (!userInfo) {
      props.history.push('/');
    }
  }, [props.history, userInfo]);

  useEffect(() => {
    dispatch(serviceList());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedClient) {
      props.history.push('/create');
    }
  }, [props.history, selectedClient]);

  useEffect(() => {
    if (servicesInfo.servicesList) {
      setSelectedService(servicesInfo.servicesList[serviceIndex]);
    }
          // setLongDescription(selectedService.longDescription);
    // console.log("serv", selectedService);

  }, [serviceIndex, servicesInfo]);
  
  useEffect(() => {
    if (selectedService) {
      setLongDescription(selectedService.longDescription);
      setPrice(selectedService.price)
      console.log("serv", selectedService);
    }

  }, [serviceIndex,selectedService])
  useEffect(() => {
    tempService = selectedService;
    tempService.longDescription = longDescription;
    setSelectedService(tempService)
  }, [longDescription]);

  useEffect(() => {
    tempService = selectedService;
    tempService.price = price;
    setSelectedService(tempService)
  }, [price]);

  const addToList = () => {
    setItemNumber(itemNumber+1)
    const tempService = servicesInfo.servicesList[serviceIndex];
    setListItems(prevArray => [...prevArray, {
      shortDescription: tempService.shortDescription,
      longDescription: tempService.longDescription,
      price: tempService.price,
      itemNumber: itemNumber
    }]);
  }

  // console.log(selectedService);
  // const addToList = () => {
  //   setListItems(prevArray => [...prevArray, selectedService]);
  // }

  const removeFromList = (index) => {
    const removedItem = listItems.splice(index,1);
    setListItems(listItems.filter(x=>x.itemNumber!==removedItem[0].itemNumber));
    // const tempList = listItems;
    // const newList = delete tempList[index];
    console.log(removedItem);

  }
  console.log("list items",listItems)
  const submitHandler = () => {

    const generatedInvoice = {
      clientName: choosenClient.clientName,
      email: choosenClient.email,
      phone: choosenClient.phone,
      address: choosenClient.address,
      ABN: choosenClient.ABN,
      listItems: listItems,
    };
    dispatch(newInvoice(generatedInvoice));

    props.history.push('/generate');
  }
    return (
      <>
        <Header />
      
              <div id="pages_maincontent">
                <h2 className="page_title" >
                  <i onClick={props.history.goBack} class="fa fa-chevron-left back-ico" aria-hidden="true"></i>
                  <i className="fa fa-plus" aria-hidden="true" />
                  &nbsp;Create Invoice
                </h2>
                <h3 id="dvResellerName" >
                  Enter invoice details here
                </h3>
        <div className="page_single layout_fullwidth_padding">
          {choosenClient ?
          <div className="client-details">
                    <div>
                      <label>Name :</label>
                      <p>{choosenClient.clientName}</p>
                    </div>
                    <div>
                      <label>Email :</label>
                      <p>{choosenClient.email}</p>
                    </div>
                    <div>
                      <label>Phone :</label>
                      <p>{choosenClient.phone}</p>
                    </div>
                    <div>
                      <label>ABN :</label>
                      <p>{choosenClient.ABN}</p>
                    </div>
            </div> : <></>}
          
          {listItems.length !== 0 ?
            <ul className="list">
              {listItems.map((v, i) =>
                <li key={i}>

                <div className="details">
                  <div><b>{v.shortDescription}</b></div>
                  <div>

                      {v.longDescription} <b>( $ {v.price} )</b>
                  </div>
                </div>
                <div className="actions">
                    <i onClick={() => removeFromList(i)}
                      className="fa fa-trash" aria-hidden="true" />
                </div>
              </li>
              )}        
            </ul> : <></>}
                  <div className="contactform" id="dvform">
                    <div className="form_row">
                      <label htmlFor="Select Client">Invoice Service: </label>
              <select onChange={(e) =>setServiceIndex(e.target.value) }
                className="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected>Please select invoice service</option>
                        {servicesInfo.servicesList? <>
                          {servicesInfo.servicesList.map((v, i) =>
                            <option key={i} id={i} value={i}>{v.shortDescription}</option>
                        )}
                        </>
                    : <></>}
                      </select>
                    </div>
                    <div className="form_row">
                      <label htmlFor="description">Description: </label>
                    <textarea onChange={(e) => setLongDescription(e.target.value)} value={longDescription}
                      name="description" id="description" rows={10} placeholder="Enter description" defaultValue={""} />
                    </div>
                    <div className="form_row">
                      <label htmlFor="amount">Amount: </label>
                <input onChange={(e) => setPrice(e.target.value)} value={price}
                  type="number" name="amount" id="amount" defaultValue placeholder="Enter Amount" className="form_input required" />
                    </div>
                    <input onClick={()=>addToList()} type="button" id="add" name="submit" className="form_submit" defaultValue="Add List Item" />
                    <button onClick={()=>submitHandler()} className='generate-inv-btn'>Generate Invoice</button>
            </div>
          </div>
        </div>
      </>

    );
  }
export default InvoiceDetailsScreen;