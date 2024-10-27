import React, { useState } from 'react';
import './invoices.css';
import { useAlert } from '../../context/alertContext';
import user from "../../Assets/user.jpg";
import { FaDownload } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const Invoices = () => {
    const { showAlert } = useAlert();
    const [currentInvoice, setCurrentInvoice] = useState(null);
    const [invoices, setInvoices] = useState([]);
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
        const index = parseInt(name.split('-')[1]);
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
        setFormData((prev) => ({
        ...prev,
        items: [...prev.items, { description: '', quantity: 1, price: 0 }],
        }));
    };

  const generateInvoice = () => {
    if (formData.name && formData.address && formData.email) {
      const invoiceNumber = `INV-${Math.floor(Math.random() * 10000)}`;
      const date = new Date().toLocaleDateString();
      
      const newInvoice = {
        invoiceNumber,
        date,
        billingInfo: {
          name: formData.name,
          address: formData.address,
          email: formData.email,
        },
        items: formData.items,
        status: 'Pending'
      };

      setCurrentInvoice(newInvoice);
      setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);

      setFormData({
        name: '',
        address: '',
        email: '',
        items: [{ description: '', quantity: 1, price: 0 }],
      });

    } else {
      alert("Please fill in all billing information.");
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const downloadInvoice = () => {
    if (!currentInvoice) return;
  
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(currentInvoice)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentInvoice.invoiceNumber}.json`;
    document.body.appendChild(element);
    element.click();
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
                    <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={handleInputChange}
                    />
                ))}

                {formData.items.map((item, index) => (
                    <div key={index} className="invoice-item">
                    <input
                        type="text"
                        name={`item-${index}-description`}
                        placeholder="Description"
                        value={item.description}
                        onChange={handleInputChange}
                    />
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
            </div>

            {currentInvoice && (
                <div className="current-invoice">
                    <div className="invoice-header">
                        <div>
                            <h2>Invoice Number: {currentInvoice.invoiceNumber}</h2>
                            <p>Date: {currentInvoice.date}</p>
                        </div>
                        <div className="billing-info">
                            <h3>Billing Information</h3>
                            <p>{currentInvoice.billingInfo?.name || "N/A"}</p>
                            <p>{currentInvoice.billingInfo?.address || "N/A"}</p>
                            <p>{currentInvoice.billingInfo?.email || "N/A"}</p>
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
                            {currentInvoice.items.map((item, index) => (
                                <tr key={index}>
                                <td>{item.description || "N/A"}</td>
                                <td>{item.quantity || 0}</td>
                                <td>${item.price.toFixed(2) || "0.00"}</td>
                                <td>${(item.quantity * item.price).toFixed(2) || "0.00"}</td>
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
                        <p>Bank Name: Stanbic Bank</p>
                        <p>Account Number: 001455697543</p>
                        <p>Routing Number: 4918472</p>
                    </div>

                    <footer className="invoice-footer">
                        Thank you for your business!
                    </footer>

                    <button className="download-button" onClick={downloadInvoice}>
                            Download Invoice <FaDownload style={{marginLeft: '5px'}}/>
                    </button>
                </div>
            )}

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