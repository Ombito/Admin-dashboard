import React, { useState } from 'react';
import './invoices.css';
import { useAlert } from '../../context/alertContext';
import user from "../../Assets/user.jpg";
import { FaDownload } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const Invoices = () => {
    const { showAlert } = useAlert();
    const [invoices, setInvoices] = useState([]);
    const [currentInvoice, setCurrentInvoice] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        items: [{ description: '', quantity: 1, price: 0 }],
    });

    const [selectedInvoices, setSelectedInvoices] = useState([]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('item-')) {
        const index = parseInt(name.split('-')[1], 10);
        const field = name.split('-')[2];

      setFormData((prev) => {
        const updatedItems = [...prev.items];
        updatedItems[index][field] = field === 'quantity' || field === 'price' ? parseFloat(value) : value;
        return { ...prev, items: updatedItems };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


const addNewItem = () => {
    const lastItem = formData.items[formData.items.length - 1];
    if (!lastItem.description || !lastItem.quantity || !lastItem.price) {
        showAlert('error', 'Please fill in all fields before adding another description.');
      return;
    }
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0 }],
    });
  };



const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + item.quantity * item.price, 0);
};



const generateInvoice = () => {
    if (formData.name && formData.address && formData.email) {
        const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}`;
        const date = new Date().toLocaleDateString();

        setCurrentInvoice({
            invoiceNumber,
            date,
            billingInfo: {
              name: formData.name,
              address: formData.address,
              email: formData.email,
            },
            items: formData.items,
            status: 'Pending'
          });
        } else {
          alert("Please fill in all billing information.");
        }

//   const newInvoice = {
//       invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
//       date: new Date().toLocaleDateString(),

//       billingInfo: {
//         name: formData.name,
//         address: formData.address,
//         email: formData.email,
//       },
//       items: formData.items,
//       status: 'Pending'
//   };
  setInvoices([...invoices, currentInvoice]); 
};

const calculateTotalInvoices = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};


const handleInvoiceCheckboxChange = (invoiceNumber) => {
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(invoiceNumber)
        ? prevSelected.filter(id => id !== invoiceNumber)
        : [...prevSelected, invoiceNumber]
    );
  };


const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      const allInvoiceNumbers = invoices.map(invoice => invoice.invoiceNumber);
      setSelectedInvoices(allInvoiceNumbers);
    } else {
      setSelectedInvoices([]);
    }
  };


const InvoiceDocument = ({ invoice }) => (
  <Document>
      <Page size="A4" className="page">
          <Text className="title">Invoice</Text>
          <View className="header">
              <View>
                  <Text className="invoiceNumber">Invoice Number: {invoice.invoiceNumber}</Text>
                  <Text>Date: {invoice.date}</Text>
              </View>
              <View className="billingInfo">
                  <Text className="billingTitle">Billing Information</Text>
                  <Text>{invoice.billingInfo.name}</Text>
                  <Text>{invoice.billingInfo.address}</Text>
                  <Text>{invoice.billingInfo.email}</Text>
              </View>
          </View>

          <View className="table">
              <View className="tableRow">
                  <Text className="tableHeader">Description</Text>
                  <Text className="tableHeader">Quantity</Text>
                  <Text className="tableHeader">Price</Text>
                  <Text className="tableHeader">Total</Text>
              </View>
              {invoice.items.map((item, index) => (
                  <View key={index} className="tableRow">
                      <Text>{item.description}</Text>
                      <Text>{item.quantity}</Text>
                      <Text>${item.price.toFixed(2)}</Text>
                      <Text>${(item.quantity * item.price).toFixed(2)}</Text>
                  </View>
              ))}
          </View>

          <View className="total">
              <Text>Total Amount Due:</Text>
              <Text>${calculateTotal(invoice.items).toFixed(2)}</Text>
          </View>

          <View className="paymentInfo">
              <Text>Payment Instructions:</Text>
              <Text>Please make the payment to the following account:</Text>
              <Text>Bank Name: Example Bank</Text>
              <Text>Account Number: 3891649557</Text>
              <Text>Routing Number: 983476264</Text>
          </View>

          <Text className="footer">Thank you for your business!</Text>
      </Page>
  </Document>
);


const downloadInvoice = () => {
  if (!currentInvoice) return;

  const element = document.createElement("a");
  const file = new Blob([JSON.stringify(currentInvoice)], { type: 'application/json' });
  element.href = URL.createObjectURL(file);
  element.download = `${currentInvoice.invoiceNumber}.json`;
  document.body.appendChild(element);
  element.click();
};



return (
  <div className="invoice-container">
    <div className="navbar-div">
      <div className="navbar-div-hero-section">
        <h2>Invoices</h2>
      </div>
      <div className='sidebar-username'>
        <div className="admin-profile">
          <img src={user} alt="avatar" />
        </div>
      </div>
    </div>
    <div className="invoice-hero">

        <div className="invoice-form">
            <h2>Create New Invoice</h2>
            {['name', 'address', 'email'].map((field) => (
                <input key={field} type={field === 'email' ? 'email' : 'text'} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} onChange={handleInputChange} />
            ))}

{formData.items.map((item, index) => (
        <div key={index} className="invoice-item">
          <div className="description-container">
            <input
              type="text"
              name={`item-${index}-description`}
              placeholder="Description"
              value={item.description}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="number"
            name={`item-${index}-quantity`}
            placeholder="Quantity"
            value={item.quantity}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name={`item-${index}-price`}
            placeholder="Price"
            value={item.price}
            onChange={handleInputChange}
          />
          
          <button type="button" className="add-invoice-btn" onClick={addNewItem}>
                ➕
              </button>
        </div>
      ))}
      <button className="generate-button" onClick={generateInvoice}>
            Generate New Invoice
        </button>              
         
            {/* <button className="add-item-button" onClick={addItem}>Add Item</button> */}

        </div>
        <div>
            {currentInvoice && (
                <div className="current-invoice">
                    <h2>Current Invoice</h2>
                    <p>Invoice Number: {currentInvoice.invoiceNumber}</p>
                    <p>Date: {currentInvoice.date}</p>
                <div>
                <div className="invoice-header">
                    <div>
                        <h2>Invoice Number: {formData.invoiceNumber}</h2>
                        <p>Date: {formData.date}</p>
                    </div>
                    <div className="billing-info">
                        <h3>Billing Information</h3>
                        <p>{formData.billingInfo.name}</p>
                        <p>{formData.billingInfo.address}</p>
                        <p>{formData.billingInfo.email}</p>
                    </div>
                </div>

                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="total">
                    <h3>Total Amount Due:</h3>
                    <p>${calculateTotal().toFixed(2)}</p>
                </div>

                <div className="payment-info">
                    <h3>Payment Instructions</h3>
                    <p>Please make the payment to the following account:</p>
                    <p>Bank Name: Example Bank</p>
                    <p>Account Number: 123456789</p>
                    <p>Routing Number: 987654321</p>
                </div>

                <footer className="invoice-footer">
                    Thank you for your business!
                </footer>
                    </div>
                    <button className="download-button" onClick={downloadInvoice}>
                        Download Invoice
                    </button>
                </div>
            )}
        </div>
        <div>
                <h2>Previous Invoices</h2>
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                type="checkbox"
                                checked={selectedInvoices.length === invoices.length}
                                onChange={handleSelectAllChange}
                                />
                            </th>
                            <th>Invoice Number</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedInvoices.includes(invoice.invoiceNumber)}
                                        onChange={() => handleInvoiceCheckboxChange(invoice.invoiceNumber)}
                                    />
                                    </td>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{invoice.date}</td>
                                <td>${(invoice.items.reduce((total, item) => total + item.quantity * item.price, 0)).toFixed(2)}</td>
                                <td>{invoice.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </div>

      
  </div> 
);
};

export default Invoices;