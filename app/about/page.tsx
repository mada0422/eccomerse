"use client";
import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function AboutPage() {
  const [cart, setCart] = useState<any[]>([]);

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

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
            About Eccomerse
          </h1>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '0',
            opacity: 0.95,
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We're passionate about bringing you the best products at unbeatable prices. 
            Our mission is to make quality shopping accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '60px',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: '800',
              color: '#1a1a1a',
              marginBottom: '24px'
            }}>
              Our Mission
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              lineHeight: '1.7',
              marginBottom: '24px'
            }}>
              At Eccomerse, we believe that everyone deserves access to high-quality products 
              at fair prices. Our mission is to create a seamless shopping experience that 
              connects customers with the best products from around the world.
            </p>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              lineHeight: '1.6'
            }}>
              We're committed to providing exceptional customer service, fast delivery, 
              and a wide selection of products that meet your needs and exceed your expectations.
            </p>
          </div>
          <div style={{
            background: '#f8faff',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '20px'
            }}>
              🎯
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '12px'
            }}>
              Quality First
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Every product in our catalog is carefully selected to ensure the highest quality standards.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2.8rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '16px'
          }}>
            Our Values
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            The principles that guide everything we do
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              icon: '🤝',
              title: 'Customer First',
              description: 'We put our customers at the heart of everything we do, ensuring their satisfaction is our top priority.'
            },
            {
              icon: '⚡',
              title: 'Fast & Reliable',
              description: 'Quick delivery and reliable service that you can count on, every single time.'
            },
            {
              icon: '💎',
              title: 'Quality Assured',
              description: 'Every product meets our strict quality standards before reaching your doorstep.'
            },
            {
              icon: '🌱',
              title: 'Sustainable',
              description: 'We\'re committed to environmentally responsible practices and sustainable business growth.'
            }
          ].map((value, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px 32px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
              }}>
                {value.icon}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '16px'
              }}>
                {value.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#666',
                lineHeight: '1.6'
              }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #f8faff 0%, #e6f0fa 100%)',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '50px'
          }}>
            Our Numbers
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Products Available' },
              { number: '24/7', label: 'Customer Support' },
              { number: '99%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '900',
                  color: '#0070f3',
                  marginBottom: '12px'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '1.1rem',
                  color: '#666',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2.8rem',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '16px'
          }}>
            Meet Our Team
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            The passionate people behind Eccomerse
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            {
              name: 'Sarah Johnson',
              role: 'CEO & Founder',
              avatar: '👩‍💼',
              description: 'Passionate about creating amazing shopping experiences.'
            },
            {
              name: 'Michael Chen',
              role: 'Head of Operations',
              avatar: '👨‍💼',
              description: 'Ensuring smooth operations and customer satisfaction.'
            },
            {
              name: 'Emily Rodriguez',
              role: 'Customer Success',
              avatar: '👩‍💻',
              description: 'Dedicated to making every customer interaction exceptional.'
            },
            {
              name: 'David Kim',
              role: 'Product Manager',
              avatar: '👨‍💻',
              description: 'Curating the best products for our customers.'
            }
          ].map((member, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
            >
              <div style={{
                fontSize: '4rem',
                marginBottom: '20px'
              }}>
                {member.avatar}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '8px'
              }}>
                {member.name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#0070f3',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                {member.role}
              </p>
              <p style={{
                fontSize: '0.9rem',
                color: '#666',
                lineHeight: '1.5'
              }}>
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #0070f3 0%, #00c6ff 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        textAlign: 'center',
        color: '#fff'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          marginBottom: '20px'
        }}>
          Get in Touch
        </h2>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '32px',
          opacity: 0.95,
          maxWidth: '600px',
          margin: '0 auto 32px auto'
        }}>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a href="/contact" style={{
            background: '#fff',
            color: '#0070f3',
            padding: '14px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
          }}>
            Contact Us
          </a>
          <a href="/products" style={{
            background: 'rgba(255,255,255,0.2)',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            Shop Now
          </a>
        </div>
      </section>
    </main>
  );
} 