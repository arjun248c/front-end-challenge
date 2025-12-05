import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export default function Products() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '' });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({ ...product });
        } else {
            setEditingProduct(null);
            setFormData({ name: '', price: '', stock: '', category: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (editingProduct) {
            await updateProduct(editingProduct.id, formData);
        } else {
            await addProduct(formData);
        }
        await loadProducts();
        handleCloseModal();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setLoading(true);
            await deleteProduct(id);
            await loadProducts();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Products</h1>
                <button onClick={() => handleOpenModal()} className="btn btn-primary">
                    <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Product
                </button>
            </div>

            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Name</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Category</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Price</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Stock</th>
                            <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>{product.name}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '999px',
                                        fontSize: '0.75rem',
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        opacity: 0.8
                                    }}>
                                        {product.category}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>${Number(product.price).toFixed(2)}</td>
                                <td style={{ padding: '1rem' }}>
                                    {product.stock === 0 || product.stock === '0' ? (
                                        <span style={{ color: '#ef4444', fontWeight: '500' }}>Out of Stock</span>
                                    ) : (
                                        product.stock
                                    )}
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button onClick={() => handleOpenModal(product)} className="btn" style={{ padding: '0.5rem', marginRight: '0.5rem' }}>
                                        <Edit2 size={16} />
                                    </button>

                                    {/* Delete button only for Managers */}
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="btn"
                                        disabled={user?.role !== 'manager'}
                                        style={{
                                            padding: '0.5rem',
                                            color: user?.role === 'manager' ? '#ef4444' : 'var(--text-muted)',
                                            opacity: user?.role === 'manager' ? 1 : 0.5,
                                            cursor: user?.role === 'manager' ? 'pointer' : 'not-allowed'
                                        }}
                                        title={user?.role === 'manager' ? "Delete Product" : "Only Managers can delete products"}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <div className="text-center" style={{ padding: '2rem' }}>Loading...</div>}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 50
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', margin: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={handleCloseModal} className="btn" style={{ padding: '0.5rem' }}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Product Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="mb-4">
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Price</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="input"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Stock</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={formData.stock}
                                        onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Category</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" onClick={handleCloseModal} className="btn" style={{ border: '1px solid var(--border)' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary">
                                    <Save size={18} style={{ marginRight: '0.5rem' }} /> Save Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
