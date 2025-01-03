import React, { useState, useEffect } from 'react';
import './invoices.css';
import { useAlert } from '../../context/alertContext';
import user from "../../Assets/user.jpg";
import { FaDownload } from 'react-icons/fa';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import data from '../data.json';


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
    const [createInvoiceModal, setCreateInvoiceModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setInvoices(data.invoices);
    }, []);

    const invoiceToggleModal = () => {
      setCreateInvoiceModal(true);
      document.body.style.overflow = 'auto';
  }
  
  const handleInvoiceClose = () => {
    setCreateInvoiceModal(false);
    document.body.style.overflow = 'auto';
  };
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

      setCreateInvoiceModal(false);
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

  // const calculateTotalInvoices = (items) => {
  //   return items.reduce((total, item) => total + item.quantity * item.price, 0);
  // };

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
};

const filteredInvoices = invoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
);

  const InvoiceDocument = ({ invoice }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>INVOICE</Text>
        <View style={styles.header}>
          <View>
            <Text style={styles.invoiceNumber}>Invoice Number: {invoice.invoiceNumber}</Text>
            <Text>Date: {invoice.date}</Text>
          </View>
          <View style={styles.billingInfo}>
            <Text style={styles.billingTitle}>Billing Information</Text>
            <Text>{invoice.billingInfo.name}</Text>
            <Text>{invoice.billingInfo.address}</Text>
            <Text>{invoice.billingInfo.email}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Description</Text>
            <Text style={styles.tableHeader}>Quantity</Text>
            <Text style={styles.tableHeader}>Price</Text>
            <Text style={styles.tableHeader}>Total</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.description}>{item.description}</Text>
              <Text>{item.quantity}</Text>
              <Text>${item.price.toFixed(2)}</Text>
              <Text>${(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text>Total Amount Due:</Text>
          <Text>${(invoice.items.reduce((total, item) => total + item.quantity * item.price, 0)).toFixed(2)}</Text>
        </View>

        <View style={styles.paymentInfo}>
          <Text>Payment Instructions</Text>
          <Text>Please make the payment to the following account:</Text>
          <Text>Bank Name: Stanbic Bank</Text>
          <Text>Account Number: 0010455697543</Text>
          <Text>Branch: Town Center</Text>
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );



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
        <div className="analytics-section">
            <div className="analytics-card">
                <h3>Total Invoices</h3>
                <p>{invoices.length}</p>
            </div>
            <div className="analytics-card">
                <h3>Paid Invoices</h3>
                <p>{invoices.filter(invoice => invoice.status === 'Paid').length}</p>
            </div>
            <div className="analytics-card">
                <h3>Pending Invoices</h3>
                <p>{invoices.filter(invoice => invoice.status === 'Pending').length}</p>
            </div>
        </div>
        <div className="invoice-hero">
        {createInvoiceModal && (
          <div className="invoice-form-content">
            <div className="invoice-form">
              <span className="logout-close" onClick={handleInvoiceClose}>&times;</span>
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
          </div>
          )}

            {currentInvoice && (
                <div className="current-invoice">
                     <h2 style={{textAlign: 'center'}}>INVOICE</h2>
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
                                <td>${(item.quantity * item.price).toFixed(2) }</td>
                              </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="total">
                        <h3>Total Amount Due:</h3>
                        <p>${(currentInvoice.items.reduce((total, item) => total + item.quantity * item.price, 0)).toFixed(2)}</p>
                    </div>

                    <div className="payment-info">
                        <h3>Payment Instructions</h3>
                        <p>Please make the payment to the following account:</p>
                        <p>Bank Name: Stanbic Bank</p>
                        <p>Account Number: 0010455697543</p>
                        <p>Branch: Town Center</p>
                    </div>

                    <footer className="invoice-footer">
                        Thank you for your business!
                    </footer>

                    <PDFDownloadLink document={<InvoiceDocument invoice={currentInvoice} />} fileName={`${currentInvoice.invoiceNumber}.pdf`}>
                      {({ loading }) => (
                        loading ? 
                        "Loading document..." : 
                        (<button className="download-button">
                          Download Invoice 
                          <FaDownload style={{ marginLeft: '5px' }} />
                        </button>)
                      )}
                    </PDFDownloadLink>
                </div>
            )}

            <div>
                <div class="invoices-controls-hero">
                    <h2>Previous Invoices</h2>
                    <div className="invoices-controls">
                        <button onClick={invoiceToggleModal} className="add-invoice-button">Add Invoice</button>
                        <input type='text' className="search-invoices" placeholder='Search invoices...' value={searchTerm} onChange={handleSearchChange}/>
                    </div>
                </div>
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
                        {filteredInvoices.map((invoice, index) => (
                            <tr key={index}>
                                <td className='checkbox-tr'>
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


const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: 'Helvetica',
      fontSize: 12,
      color: 'black',
      paddingVertical: 8,
    },
    Text: {
        padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingVertical: 8,
    },
    invoiceNumber: {
      fontSize: 16,
      fontWeight: 'bolder',
      marginBottom:'10px',
    },
    billingInfo: {
      textAlign: 'right',
      paddingVertical: 8,
      gap: '5px',
    },
    billingTitle: {
      fontSize: 14,
      fontWeight: 'bolder',
      marginBottom: 5,
    },
    description:{
        width:'fit-content', 
        whiteSpace:'nowrap', 
        overflow:'hidden', 
        textOverflow:'ellipsis', 
    },
    table: {
      width: '100%',
    //   borderCollapse: 'collapse',
      marginBottom: 20,
      marginTop:'20px',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingVertical: 8,
    },
    tableHeader: {
      fontWeight:'bold',
      
     },
     total:{
         marginTop:'20px',
         fontWeight:'bold'
     },
     paymentInfo:{
         marginTop:'30px',
         gap: '10px',
     },
     footer:{
         marginTop:'20px',
         textAlign:'center'
     }
  });

export default Invoices;