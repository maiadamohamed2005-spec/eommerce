
import { useState } from "react";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Truck,
  RefreshCcw,
  ShieldCheck,
  Headset,
  ArrowRight
} from "lucide-react";

import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setSuccess(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSuccess(true);

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: ""
    });
  }

  return (
    <div className="contact-page">

      {/* Breadcrumb */}
      <div className="container">
        <div className="contact-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Contact Us</span>
        </div>
      </div>

      {/* Page Header */}
      <section className="contact-header">
        <div className="container text-center">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container contact-content">

        <div className="row g-4">

          {/* Phone */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-info-card">

              <div className="contact-icon">
                <Phone size={25} />
              </div>

              <h5>Phone</h5>

              <p>Mon-Fri from 8am to 6pm</p>

              <a href="tel:+18001234567">
                +1 (800) 123-4567
              </a>

            </div>
          </div>

          {/* Email */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-info-card">

              <div className="contact-icon">
                <Mail size={25} />
              </div>

              <h5>Email</h5>

              <p>We'll respond within 24 hours</p>

              <a href="mailto:support@freshcart.com">
                support@freshcart.com
              </a>

            </div>
          </div>

          {/* Office */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-info-card">

              <div className="contact-icon">
                <MapPin size={25} />
              </div>

              <h5>Office</h5>

              <p>Visit our office</p>

              <span>
                123 Commerce Street,
                New York, NY 10001,
                United States
              </span>

            </div>
          </div>

          {/* Business Hours */}
          <div className="col-md-6 col-lg-3">
            <div className="contact-info-card">

              <div className="contact-icon">
                <Clock size={25} />
              </div>

              <h5>Business Hours</h5>

              <div className="business-hours">
                <p>Monday - Friday: 8am - 6pm</p>
                <p>Saturday: 9am - 4pm</p>
                <p>Sunday: Closed</p>
              </div>

            </div>
          </div>

        </div>

        {/* Social Media */}
        <div className="contact-social text-center">

          <h5>Follow Us</h5>

          <div className="social-icons">

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>

          </div>

        </div>

      </section>

      {/* Contact Form */}
      <section className="contact-form-section">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-lg-8">

              <div className="contact-form-card">

                <div className="text-center mb-4">

                  <h2>Send us a Message</h2>

                  <p>
                    Fill out the form and we'll get back to you
                  </p>

                </div>

                {success && (
                  <div className="alert alert-success">
                    Your message has been submitted successfully!
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* Full Name */}
                  <div className="mb-3">

                    <label className="form-label">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* Email */}
                  <div className="mb-3">

                    <label className="form-label">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* Subject */}
                  <div className="mb-3">

                    <label className="form-label">
                      Subject
                    </label>

                    <select
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >

                      <option value="" disabled>
                        Select a subject
                      </option>

                      <option value="General Inquiry">
                        General Inquiry
                      </option>

                      <option value="Order Support">
                        Order Support
                      </option>

                      <option value="Shipping Question">
                        Shipping Question
                      </option>

                      <option value="Returns & Refunds">
                        Returns & Refunds
                      </option>

                      <option value="Product Information">
                        Product Information
                      </option>

                      <option value="Feedback & Suggestions">
                        Feedback & Suggestions
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>

                  {/* Message */}
                  <div className="mb-4">

                    <label className="form-label">
                      Message
                    </label>

                    <textarea
                      name="message"
                      className="form-control"
                      rows="5"
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>

                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn contact-submit-btn w-100"
                  >
                    Send Message
                    <ArrowRight size={18} />
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Help Center */}
      <section className="container">

        <div className="help-center-box text-center">

          <h3>Looking for quick answers?</h3>

          <p>
            Check out our Help Center for frequently asked questions
            about orders, shipping, returns, and more.
          </p>

          <a href="/help" className="help-center-link">
            Visit Help Center
            <ArrowRight size={17} />
          </a>

        </div>

      </section>

      {/* Features */}
      <section className="container contact-features">

        <div className="row g-4">

          <div className="col-6 col-lg-3">
            <div className="contact-feature">

              <Truck size={30} />

              <h6>Free Shipping</h6>

              <p>On orders over 500 EGP</p>

            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="contact-feature">

              <RefreshCcw size={30} />

              <h6>Easy Returns</h6>

              <p>14-day return policy</p>

            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="contact-feature">

              <ShieldCheck size={30} />

              <h6>Secure Payment</h6>

              <p>100% secure checkout</p>

            </div>
          </div>

          <div className="col-6 col-lg-3">
            <div className="contact-feature">

              <Headset size={30} />

              <h6>24/7 Support</h6>

              <p>Contact us anytime</p>

            </div>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;
