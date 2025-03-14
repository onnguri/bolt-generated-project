import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { LineChart, BarChart } from './Charts'
import ProductList from './ProductList'
import Inventory from './Inventory'
import Billing from './Billing'
import Reports from './Reports'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [username, setUsername] = useState('')
  const [stats, setStats] = useState({
    products: 0,
    inventory: 0,
    sales: 0
  })

  useEffect(() => {
    getProfile()
    fetchStats()
  }, [])

  async function getProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    setUsername(user.email.split('@')[0])
  }

  async function fetchStats() {
    // Simulación de datos
    setStats({
      products: 142,
      inventory: 856,
      sales: 12450
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'products':
        return <ProductList />
      case 'inventory':
        return <Inventory />
      case 'billing':
        return <Billing />
      case 'reports':
        return <Reports />
      default:
        return (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Productos</h3>
                <p>{stats.products}</p>
              </div>
              <div className="stat-card">
                <h3>Inventario Total</h3>
                <p>{stats.inventory}</p>
              </div>
              <div className="stat-card">
                <h3>Ventas Totales</h3>
                <p>${stats.sales.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="charts-grid">
              <div className="chart-card">
                <h3>Ventas Mensuales</h3>
                <LineChart />
              </div>
              <div className="chart-card">
                <h3>Productos Más Vendidos</h3>
                <BarChart />
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Mi Negocio</h2>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Productos
          </button>
          <button 
            className={activeTab === 'inventory' ? 'active' : ''}
            onClick={() => setActiveTab('inventory')}
          >
            Inventario
          </button>
          <button 
            className={activeTab === 'billing' ? 'active' : ''}
            onClick={() => setActiveTab('billing')}
          >
            Facturación
          </button>
          <button 
            className={activeTab === 'reports' ? 'active' : ''}
            onClick={() => setActiveTab('reports')}
          >
            Reportes
          </button>
        </nav>
        
        <div className="user-info">
          <p>Hola, {username}</p>
          <button onClick={signOut}>Cerrar Sesión</button>
        </div>
      </aside>

      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}
