import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/HomePage.css'; // Import your custom CSS file

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState('personal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    socialLink: '',
    address: '',
    city: '',
    postalCode: '',
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    productLink: '',
    petName: '',
    petType: '',
    petAge: '',
    petBreed: ''
  });
  const [qrValue, setQrValue] = useState('');
  const [fgColor, setFgColor] = useState('#000000'); // Foreground color
  const [bgColor, setBgColor] = useState('#ffffff'); // Background color
  const [cornerRadius, setCornerRadius] = useState(0); // Corner radius
  const qrRef = useRef(null); // Create a ref to access the QR code container

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Reset form data on option change
    setFormData({
      name: '',
      email: '',
      phone: '',
      socialLink: '',
      address: '',
      city: '',
      postalCode: '',
      eventName: '',
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      productLink: '',
      petName: '',
      petType: '',
      petAge: '',
      petBreed: ''
    });
    setQrValue('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGenerateQR = () => {
    let qrData = '';

    switch (selectedOption) {
      case 'personal':
        qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${formData.name}\nEMAIL:${formData.email}\nTEL:${formData.phone}\nURL:${formData.socialLink}\nEND:VCARD`;
        break;
      case 'social':
        qrData = formData.socialLink;
        break;
      case 'address':
        qrData = `BEGIN:VCARD\nVERSION:3.0\nADR:;;${formData.address};${formData.city};;${formData.postalCode}\nEND:VCARD`;
        break;
      case 'event':
        qrData = `BEGIN:VEVENT\nSUMMARY:${formData.eventName}\nDTSTART:${formData.eventDate}T${formData.eventTime}\nLOCATION:${formData.eventLocation}\nEND:VEVENT`;
        break;
      case 'product':
        qrData = formData.productLink;
        break;
      case 'pet':
        qrData = `BEGIN:PET\nNAME:${formData.petName}\nTYPE:${formData.petType}\nAGE:${formData.petAge}\nBREED:${formData.petBreed}\nEND:PET`;
        break;
      default:
        qrData = '';
    }

    setQrValue(qrData);
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.href = image;
    link.download = `qrcode_${selectedOption}.png`; // Use the selected option for filename
    link.click();
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">QR Code Generator</h1>

      <div className="mb-4">
        <label htmlFor="optionsDropdown" className="form-label">Select QR Code Type</label>
        <select
          id="optionsDropdown"
          className="form-select"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="personal">Personal Details</option>
          <option value="social">Social Media Link</option>
          <option value="address">Address</option>
          <option value="event">Event Details</option>
          <option value="product">Product Link</option>
          <option value="pet">Pet Details</option>
        </select>
      </div>

      {selectedOption === 'personal' && (
        <div className="mt-4">
          <h2>Enter Your Personal Details</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="socialLink" className="form-label">Social Link</label>
              <input
                type="url"
                className="form-control"
                id="socialLink"
                name="socialLink"
                placeholder="Social Link"
                value={formData.socialLink}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      )}

      {selectedOption === 'social' && (
        <div className="mt-4">
          <h2>Enter Social Media Link</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="socialLink" className="form-label">Social Media Link</label>
              <input
                type="url"
                className="form-control"
                id="socialLink"
                name="socialLink"
                placeholder="Social Media Link"
                value={formData.socialLink}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      )}

      {selectedOption === 'address' && (
        <div className="mt-4">
          <h2>Enter Address Details</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="postalCode" className="form-label">Postal Code</label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      )}

      {selectedOption === 'event' && (
        <div className="mt-4">
          <h2>Enter Event Details</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="eventName" className="form-label">Event Name</label>
              <input
                type="text"
                className="form-control"
                id="eventName"
                name="eventName"
                placeholder="Event Name"
                value={formData.eventName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="eventDate" className="form-label">Event Date</label>
              <input
                type="date"
                className="form-control"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="eventTime" className="form-label">Event Time</label>
              <input
                type="time"
                className="form-control"
                id="eventTime"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="eventLocation" className="form-label">Event Location</label>
              <input
                type="text"
                className="form-control"
                id="eventLocation"
                name="eventLocation"
                placeholder="Event Location"
                value={formData.eventLocation}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      )}

      {selectedOption === 'product' && (
        <div className="mt-4">
          <h2>Enter Product Link</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="productLink" className="form-label">Product Link</label>
              <input
                type="url"
                className="form-control"
                id="productLink"
                name="productLink"
                placeholder="Product Link"
                value={formData.productLink}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      )}

      {selectedOption === 'pet' && (
        <div className="mt-4">
          <h2>Enter Pet Details</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="petName" className="form-label">Pet Name</label>
              <input
                type="text"
                className="form-control"
                id="petName"
                name="petName"
                placeholder="Pet Name"
                value={formData.petName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="petType" className="form-label">Pet Type</label>
              <input
                type="text"
                className="form-control"
                id="petType"
                name="petType"
                placeholder="Pet Type"
                value={formData.petType}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="petAge" className="form-label">Pet Age</label>
              <input
                type="text"
                className="form-control"
                id="petAge"
                name="petAge"
                placeholder="Pet Age"
                value={formData.petAge}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="petBreed" className="form-label">Pet Breed</label>
              <input
                type="text"
                className="form-control"
                id="petBreed"
                name="petBreed"
                placeholder="Pet Breed"
                value={formData.petBreed}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      )}

      <div className="mt-4">
        <h2>Style Your QR Code</h2>
        <div className="mb-3">
          <label htmlFor="fgColor" className="form-label">Foreground Color</label>
          <input
            type="color"
            id="fgColor"
            className="form-control"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bgColor" className="form-label">Background Color</label>
          <input
            type="color"
            id="bgColor"
            className="form-control"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cornerRadius" className="form-label">Corner Radius</label>
          <input
            type="range"
            id="cornerRadius"
            className="form-range"
            min="0"
            max="20"
            step="1"
            value={cornerRadius}
            onChange={(e) => setCornerRadius(Number(e.target.value))}
          />
          <span>{cornerRadius}px</span>
        </div>
      </div>

      <button className="btn btn-primary mt-3" onClick={handleGenerateQR}>
        Generate QR Code
      </button>

      {qrValue && (
        <div className="mt-4 qr-code-container" ref={qrRef}>
          <QRCode
            value={qrValue}
            size={256}
            bgColor={bgColor} // Background color
            fgColor={fgColor} // Foreground color
            qrStyle="square" // Use square modules for corner radius adjustment
            renderAs="canvas"
            includeMargin={true}
            style={{ borderRadius: `${cornerRadius}px` }} // Apply corner radius
          />
          <button className="btn btn-secondary mt-2" onClick={handleDownloadQR}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
