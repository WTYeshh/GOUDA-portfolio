import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, CheckCircle, Home, Instagram, Phone } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    shootType: 'Commercial',
    startDate: '',
    endDate: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a robust unique ID (Timestamp + Random)
    const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
    const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase();
    const newTicketId = `SLATE-${timestamp}-${randomStr}`;
    
    setTicketId(newTicketId);
    setIsSubmitted(true);

    // Format WhatsApp Message
    const whatsappNumber = "918884359993"; // REPLACE WITH YOUR NUMBER
    const message = `*NEW INQUIRY: GOUDA VISUALS*%0A` +
      `--------------------------%0A` +
      `*Ref ID:* ${newTicketId}%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Shoot:* ${formData.shootType}%0A` +
      `*Dates:* ${formData.startDate} ${formData.endDate ? `to ${formData.endDate}` : ''}%0A` +
      `*Details:* ${formData.message}%0A` +
      `--------------------------`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    // Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 2000);
  };

  return (
    <div className="contact-page container">
      <div className="contact-grid">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1>Let's Create <br /><span>Together</span></h1>
          <p className="contact-description">
            Available for worldwide shoots. Whether it's a commercial project or a cinematic narrative, I'm here to bring your vision to life.
          </p>

          <div className="contact-details">
            <div className="detail-item">
              <Mail size={20} />
              <div>
                <span className="label">Email</span>
                <a href="mailto:hello@youdomain.com">hello@youdomain.com</a>
              </div>
            </div>
            <div className="detail-item">
              <FaInstagram size={20} />
              <div>
                <span className="label">Instagram</span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@goudavisuals</a>
              </div>
            </div>
            <div className="detail-item">
              <MapPin size={20} />
              <div>
                <span className="label">Location</span>
                <span className="location-text">Bangalore, India / Global</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="contact-form-container glass"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 00000 00000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Shoot Type</label>
              <select
                name="shootType"
                value={formData.shootType}
                onChange={handleChange}
              >
                <option>Commercial</option>
                <option>Music Video</option>
                <option>Event</option>
                <option>Short Film</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date (Optional)</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Additional Information</label>
              <textarea
                name="message"
                placeholder="Tell me about your vision, location, or any specific requirements..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="slate-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
            >
              <div className="slate-header">
                <div className="slate-stripes"></div>
                <div className="slate-title">PRODUCTION SLATE</div>
              </div>

              <div className="slate-body">
                <div className="slate-row">
                  <div className="slate-cell">
                    <span className="slate-label">SCENE</span>
                    <span className="slate-value">01</span>
                  </div>
                  <div className="slate-cell">
                    <span className="slate-label">TAKE</span>
                    <span className="slate-value">01</span>
                  </div>
                </div>

                <div className="slate-main-id">
                  <span className="slate-label">PRODUCTION ID</span>
                  <span className="slate-id-text">{ticketId}</span>
                </div>

                <div className="slate-info">
                  <div className="info-block">
                    <span className="slate-label">DIRECTOR</span>
                    <span className="slate-value-small">GOUDA VISUALS</span>
                  </div>
                  <div className="info-block">
                    <span className="slate-label">CLIENT</span>
                    <span className="slate-value-small">{formData.name.toUpperCase()}</span>
                  </div>
                </div>

                <div className="slate-footer-details">
                  <div className="footer-item"><Instagram size={12}/> @goudavisuals</div>
                  <div className="footer-item"><Phone size={12}/> +91 88843 59993</div>
                  <div className="footer-item"><Mail size={12}/> gouda@visuals.in</div>
                </div>
              </div>

              <div className="slate-actions">
                <Link to="/" className="btn btn-secondary home-btn">
                  <Home size={18} /> RETURN HOME
                </Link>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-outline">
                  NEW INQUIRY
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
