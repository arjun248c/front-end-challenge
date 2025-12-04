
const USERS = [
    {
        id: '1',
        email: 'manager@slooz.com',
        password: 'password',
        name: 'Alice Manager',
        role: 'manager',
    },
    {
        id: '2',
        email: 'store@slooz.com',
        password: 'password',
        name: 'Bob Storekeeper',
        role: 'store_keeper',
    },
];

export const login = async (email, password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = USERS.find((u) => u.email === email && u.password === password);

    if (user) {
        const token = btoa(JSON.stringify({ id: user.id, role: user.role })); // Mock token
        const userData = { ...user };
        delete userData.password;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        return { user: userData, token };
    }

    throw new Error('Invalid credentials');
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};
