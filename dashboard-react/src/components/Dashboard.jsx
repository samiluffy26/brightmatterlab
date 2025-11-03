import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { useComponentAnimations } from '../hooks/useAnimations'
import '../styles/dashboard.css'

Chart.register(...registerables)

export default function Dashboard() {
  const chartRef = useRef(null)
  const chartInstanceRef = useRef(null)
  const pageRef = useComponentAnimations()
  
  useEffect(() => {
    // Destruir chart anterior si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }
    
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      
      // Crear gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, 400)
      gradient.addColorStop(0, 'rgba(168, 85, 247, 0.4)')
      gradient.addColorStop(1, 'rgba(168, 85, 247, 0)')

      // Crear gráfico y guardarlo en la ref
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            data: [50, 200, 100, 300],
            borderColor: 'rgba(168, 85, 247, 1)',
            backgroundColor: gradient,
            borderWidth: 3,
            pointBackgroundColor: 'rgba(168, 85, 247, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { 
            legend: { display: false } 
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 300,
              ticks: {
                stepSize: 50,
                color: 'rgba(255, 255, 255, 0.6)',
                font: {
                  size: 12
                }
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
                drawBorder: false
              }
            },
            x: {
              ticks: {
                color: 'rgba(255, 255, 255, 0.6)',
                font: {
                  size: 12
                }
              },
              grid: {
                display: false,
                drawBorder: false
              }
            }
          }
        }
    })
  }

  // CLEANUP FUNCTION - Destruir el chart cuando el componente se desmonte
  return () => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }
  }
}, []) // Array de dependencias vacío
  
  return (
    <div ref={pageRef} className="page-container">
      <div className="header">
        <div className="header-top">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Track your sales, revenue, and growth metrics in real time.</p>
          </div>
          <div className="header-right">
            <div className="profile-pic">
              <svg width="55" height="55" viewBox="0 0 55 55">
                <rect width="55" height="55" fill="#e5e7eb"/>
                <circle cx="27.5" cy="20" r="8" fill="#9ca3af"/>
                <path d="M10 45c0-8 7-12 17.5-12S45 37 45 45" fill="#9ca3af"/>
              </svg>
            </div>
            <div className="notification-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M18 8c0-3.3-2.7-6-6-6S6 4.7 6 8c0 4.5-2 6-2 6h16s-2-1.5-2-6z"/>
                <path d="M13.73 21c-.3.5-.8.9-1.4 1-.6.1-1.3-.1-1.7-.6-.2-.2-.3-.5-.4-.8"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
      <div className="chart-section">
        <button className="graphic-button">Graphic table</button>
        
        <div className="chart-container animate-on-scroll">
          <div className="chart-header">
            <h2>Page visits</h2>
            <button className="dropdown">Monthly Reports ▼</button>
          </div>
          
          <div className="chart">
            <canvas ref={chartRef} id="myChart"></canvas>
          </div>
          
          <div style={{textAlign: 'center'}}>
            <span className="chart-note">Highest percentage of visits: Week 4</span>
          </div>
        </div>
      </div>

      <div className="requests-section">
        <div className="requests-container animate-on-scroll">
          <div className="requests-header">
            <div>
              <h2>Request</h2>
              <p>Recent requests</p>
            </div>
            <div className="menu-dots">⋮</div>
          </div>

          <div className="request-item">
            <div className="request-icon">💼</div>
            <div className="request-info">
              <div className="request-name">Samuel Guance</div>
              <div className="request-type">
                <span className="checkmark">✓</span>
                E-commerce
              </div>
            </div>
          </div>

          <div className="request-item">
            <div className="request-icon">🏢</div>
            <div className="request-info">
              <div className="request-name">Cesar Gil</div>
              <div className="request-type">
                <span className="checkmark">✓</span>
                Business Page
              </div>
            </div>
          </div>

          <div className="request-item">
            <div className="request-icon">💼</div>
            <div className="request-info">
              <div className="request-name">Leonardo Gomez</div>
              <div className="request-type">
                <span className="checkmark">✓</span>
                Network administration
              </div>
            </div>
          </div>

          <div className="request-item">
            <div className="request-icon">💼</div>
            <div className="request-info">
              <div className="request-name">Alanna Ferreras</div>
              <div className="request-type">
                <span className="checkmark">✓</span>
                Maintenance
              </div>
            </div>
          </div>

          <div className="see-all">See All ▼</div>
        </div>
      </div>
    </div>
    </div>
  )
}