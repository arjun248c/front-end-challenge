import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['manager']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/products"
                element={
                  <ProtectedRoute allowedRoles={['manager', 'store_keeper']}>
                    <Products />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
