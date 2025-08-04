"use client";
import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function ContactPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <main className={styles.page}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '80px 40px',
        marginBottom: '60px',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '0',
            opacity: 0.95,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Have questions or need assistance? We're here to help! 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '60px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Contact Form */}
          <div style={{
            background: '#fff',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '32px'
            }}>
              Send us a Message
            </h2>

            {submitStatus === 'success' && (
              <div style={{
                background: '#d4edda',
                color: '#155724',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px',
                border: '1px solid #c3e6cb'
              }}>
                ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="Your full name"
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    transition: 'border-color 0.2s',
                    background: '#fff'
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="order">Order Question</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    transition: 'border-color 0.2s',
                    resize: 'vertical'
                  }}
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting ? '#ccc' : 'linear-gradient(135deg, #0070f3 0%, #00c6ff 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 32px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '32px'
            }}>
              Contact Information
            </h2>

            <div style={{ marginBottom: '40px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
                padding: '20px',
                background: '#f8faff',
                borderRadius: '12px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginRight: '16px'
                }}>
                  📧
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '4px'
                  }}>
                    Email
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#666'
                  }}>
                    hello@eccomerse.com
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
                padding: '20px',
                background: '#f8faff',
                borderRadius: '12px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginRight: '16px'
                }}>
                  📞
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '4px'
                  }}>
                    Phone
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#666'
                  }}>
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
                padding: '20px',
                background: '#f8faff',
                borderRadius: '12px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginRight: '16px'
                }}>
                  🏢
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '4px'
                  }}>
                    Address
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#666',
                    lineHeight: '1.4'
                  }}>
                    123 Commerce Street<br />
                    Business District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                Business Hours
              </h3>
              <div style={{ lineHeight: '1.8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Monday - Friday</span>
                  <span style={{ fontWeight: '600' }}>9:00 AM - 6:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Saturday</span>
                  <span style={{ fontWeight: '600' }}>10:00 AM - 4:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Sunday</span>
                  <span style={{ fontWeight: '600', color: '#999' }}>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '16px'
          }}>
            Follow Us
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Stay connected with us on social media
          </p>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          {[
            { name: 'Facebook', icon: '📘', color: '#1877F2' },
            { name: 'Twitter', icon: '🐦', color: '#1DA1F2' },
            { name: 'Instagram', icon: '📷', color: '#E4405F' },
            { name: 'LinkedIn', icon: '💼', color: '#0077B5' }
          ].map((social, index) => (
            <a
              key={index}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 24px',
                background: '#fff',
                borderRadius: '12px',
                textDecoration: 'none',
                color: '#333',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                minWidth: '140px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{ fontSize: '1.5rem' }}>{social.icon}</div>
              <span style={{ fontWeight: '600' }}>{social.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '16px'
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Quick answers to common questions
          </p>
        </div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {[
            {
              question: "How long does shipping take?",
              answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery."
            },
            {
              question: "What is your return policy?",
              answer: "We offer a 30-day return policy for all unused items in original packaging. Return shipping is free for defective items."
            },
            {
              question: "Do you ship internationally?",
              answer: "Yes, we ship to most countries worldwide. Shipping times and costs vary by location."
            },
            {
              question: "How can I track my order?",
              answer: "You'll receive a tracking number via email once your order ships. You can also track it in your account dashboard."
            }
          ].map((faq, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '12px'
              }}>
                {faq.question}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#666',
                lineHeight: '1.6',
                margin: 0
              }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 