import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CreateInvoiceScreen from '../screens/CreateInvoiceScreen';
import InvoicesScreen from '../screens/InvoicesScreen';
import ServicesScreen from '../screens/ServicesScreen';
import InvoiceDetailsScreen from '../screens/InvoiceDetailsScreen';
import ConfigurationScreen from '../screens/ConfigrationScreen';
import GenerateInvoice from '../screens/GenerateInvoice/GenerateInvoice';
import CustomersScreen from '../screens/CustomersScreen';

export default class Routers extends Component {
    render() {
        return (
            <Router>
                <Route path='/' exact component={LoginScreen} />
                <Route path='/dashboard' component={DashboardScreen} />
                <Route path='/create' component={CreateInvoiceScreen} />
                <Route path='/generate' component={GenerateInvoice} />
                <Route path='/services' component={ServicesScreen} />
                <Route path='/invoice-details' component={InvoiceDetailsScreen} />
                <Route path='/invoices' component={InvoicesScreen} />
                <Route path='/customers' component={CustomersScreen} />
                <Route path='/configuration' component={ConfigurationScreen} />
            </Router>
       )
    }
};