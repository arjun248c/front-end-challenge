import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const user = await login(email, password);
            if (user.role === 'manager') {
                navigate('/dashboard');
            } else {
                navigate('/products');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex-center h-screen">
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Sign in to access your account</p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius)',
                        marginBottom: '1rem',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                className="input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Sign In
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                    <p>Manager: manager@slooz.com / password</p>
                    <p>Store Keeper: store@slooz.com / password</p>
                </div>
            </div>
        </div>
    );
}
