import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import Footer from "../../components/Footer";
import "./Login.css";
import axios from "axios";

const Login = ({ login, isAuthenticated }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(""); // State for the error message

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted:", { email, password });
        try {
            await login(email, password);
        } catch (err) {
            setError("Username or password is incorrect"); // Set error message
        }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/auth/o/google-oauth2/?redirect_url=http://127.0.0.1:8000`
            );
            window.location.replace(res.data.authorization_url);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const stats = [
        { number: "10K+", label: "Active Users" },
        { number: "50M+", label: "Tasks Completed" },
        { number: "99.9%", label: "Uptime" },
        { number: "24/7", label: "Support" },
    ];

    const testimonials = [
        {
            text: "Colabor8 has transformed how our team works together. The AI integration is a game-changer.",
            author: "Sarah Johnson",
            role: "Product Manager at TechCorp",
        },
        {
            text: "The most intuitive project management tool we've ever used. It's like it reads our minds!",
            author: "Mike Chen",
            role: "CTO at StartupX",
        },
        {
            text: "Finally, a collaboration tool that actually makes our work easier instead of adding complexity.",
            author: "Emily Rodriguez",
            role: "Team Lead at InnovateCo",
        },
    ];

    return (
        <div className="app-container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Create an
                        <span className="hero-title--gradient"> account</span>
                    </h1>
                    <p className="hero-subtitle">
                        Empower your team with AI-driven collaboration tools that make
                        project management effortless.
                    </p>

                    {!isAuthenticated && (
                        <div className="signup-container">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Work email"
                                        className="email-input"
                                        value={email}
                                        onChange={onChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="email-input"
                                        value={password}
                                        onChange={onChange}
                                        minLength="6"
                                        required
                                    />
                                </div>
                                {error && <p className="error-text">{error}</p>} {/* Error message */}
                                <button type="submit" className="signup-button">
                                    Login
                                </button>
                            </form>

                            <div className="divider">
                                <span>Or continue with</span>
                            </div>

                            <div className="social-buttons">
                                <button className="social-button" onClick={continueWithGoogle}>
                                    Google
                                </button>
                                <button className="social-button">
                                    Facebook
                                </button>
                            </div>
                            <p className="already-user-text">
                                Not a user? <Link to="/signup">Signup</Link>
                            </p>
                            <p className="already-user-text">
                                Forgot your password? <Link to="/reset-password">Reset Password</Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="stats-section">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="testimonials-section">
                <h2 className="section-title">What our users say</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <p className="testimonial-text">{testimonial.text}</p>
                            <div className="testimonial-author">
                                <div className="author-avatar"></div>
                                <div className="author-info">
                                    <h4>{testimonial.author}</h4>
                                    <p>{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
