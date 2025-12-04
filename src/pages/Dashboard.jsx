import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: color + '20',
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Icon size={24} />
        </div>
        <div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{title}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
        </div>
    </div>
);

export default function Dashboard() {
    return (
        <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>Dashboard Overview</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <StatCard title="Total Sales" value="$12,450" icon={DollarSign} color="#10b981" />
                <StatCard title="Active Users" value="1,234" icon={Users} color="#3b82f6" />
                <StatCard title="Total Products" value="45" icon={Package} color="#f59e0b" />
                <StatCard title="Growth" value="+12.5%" icon={TrendingUp} color="#8b5cf6" />
            </div>

            <div className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Recent Activity</h2>
                <p style={{ color: 'var(--text-muted)' }}>No recent activity to show.</p>
            </div>
        </div>
    );
}
