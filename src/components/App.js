import React, { useState } from 'react';
import '../styles/App.css';

const predefinedUser = { email: 'user@example.com', password: 'password123' };

const App = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const field = id.replace('input-', ''); // Extract 'email' or 'password'

        setFormData((prevData) => ({ ...prevData, [field]: value }));
        
        // Clear only the related error when the user types
        setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({ email: '', password: '' });

        setTimeout(() => {
            setLoading(false);

            if (formData.email !== predefinedUser.email) {
                setErrors((prev) => ({ ...prev, email: 'User not found' }));
            } else if (formData.password !== predefinedUser.password) {
                setErrors((prev) => ({ ...prev, password: 'Password Incorrect' }));
            } else {
                alert('Login Successful!');
                setFormData({ email: '', password: '' });
                setErrors({ email: '', password: '' }); // Clear errors upon successful login
            }
        }, 3000);
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='input-email'>Email:</label> <br />
                <input 
                    type='email' 
                    id='input-email' 
                    value={formData.email} 
                    onChange={handleChange} 
                /> <br /> <br />
                {errors.email && <p id='user-error' className='error-message'>{errors.email}</p>}

                <label htmlFor='input-password'>Password:</label> <br/>
                <input 
                    type='password' 
                    id='input-password' 
                    value={formData.password} 
                    onChange={handleChange} 
                /> <br /> <br/>
                {errors.password && <p id='password-error' className='error-message'>{errors.password}</p>}

                <button type='submit' id='submit-form-btn' disabled={loading}>
                    {loading ? 'Validating...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default App;
