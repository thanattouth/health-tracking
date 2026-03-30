// src/pages/DashboardPage.jsx
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import { Menu, HeartPulse, Smile, Moon, Utensils, Activity, Eraser, Save, Trash2, Pencil } from 'lucide-react'
import '../styles/Dashboard.css'

export default function DashboardPage() {
    const { user } = useAuth()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState('#00b894')
    const [brushSize, setBrushSize] = useState(5)
    const [isEraser, setIsEraser] = useState(false)

    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U'
    const userName = user?.name || 'Guest'

    const resizeCanvas = () => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (canvas && container) {
            const tempImage = canvas.toDataURL()
            
            canvas.width = container.offsetWidth
            canvas.height = 450

            const ctx = canvas.getContext('2d')
            ctx.fillStyle = "#ffffff"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            
            const img = new Image()
            img.src = tempImage
            img.onload = () => ctx.drawImage(img, 0, 0)

            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
        }
    }

    useEffect(() => {
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
        return () => window.removeEventListener('resize', resizeCanvas)
    }, [])

    const getCoordinates = (nativeEvent) => {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        return {
            x: nativeEvent.clientX - rect.left,
            y: nativeEvent.clientY - rect.top
        }
    }

    const startDrawing = ({ nativeEvent }) => {
        const { x, y } = getCoordinates(nativeEvent)
        const ctx = canvasRef.current.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.strokeStyle = isEraser ? '#ffffff' : color
        ctx.lineWidth = brushSize
        setIsDrawing(true)
    }

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return
        const { x, y } = getCoordinates(nativeEvent)
        const ctx = canvasRef.current.getContext('2d')
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    const stopDrawing = () => {
        setIsDrawing(false)
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const saveCanvas = () => {
        const canvas = canvasRef.current
        const image = canvas.toDataURL("image/png")
        const link = document.createElement('a')
        link.download = `my-sketch.png`
        link.href = image
        link.click()
    }

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-left">
                        <button className="btn-menu" onClick={() => setIsSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <div className="search-bar">
                            <input type="text" placeholder="Search activities..." />
                        </div>
                    </div>
                    <div className="user-profile">
                        <span className="user-name">{userName}</span>
                        <div className="avatar">{userInitial}</div>
                    </div>
                </header>

                <div className="dashboard-content">
                    <div className="hero-banner">
                        <div className="hero-text">
                            <h1>Welcome back, {userName}!</h1>
                            <p>Here is your daily health overview.</p>
                        </div>
                        <div className="hero-illustration">
                            <HeartPulse size={120} strokeWidth={1} />
                        </div>
                    </div>

                    <div className="stat-grid">
                        <StatCard title="Mood" percentage={80} color="var(--color-mood)" icon={<Smile size={24} />} />
                        <StatCard title="Sleep" percentage={65} color="var(--color-sleep)" icon={<Moon size={24} />} />
                        <StatCard title="Meal" percentage={90} color="var(--color-meal)" icon={<Utensils size={24} />} />
                        <StatCard title="Exercise" percentage={40} color="var(--color-primary)" icon={<Activity size={24} />} />
                    </div>

                    <div className="charts-grid">
                        <div className="chart-card"><h3>Activity Rate</h3><div className="mock-line-chart">[ Line Chart ]</div></div>
                        <div className="chart-card"><h3>Health Score</h3><div className="mock-circle-chart"><div className="circle">78%</div></div></div>
                    </div>

                    <div className="chart-card" ref={containerRef} style={{ marginTop: '2rem', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={{ margin: 0 }}>Drawing Area</h3>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <button onClick={() => setIsEraser(false)} style={{ background: !isEraser ? '#eee' : 'none', border: '1px solid #ddd', padding: '5px', borderRadius: '4px' }}><Pencil size={18} /></button>
                                <button onClick={() => setIsEraser(true)} style={{ background: isEraser ? '#eee' : 'none', border: '1px solid #ddd', padding: '5px', borderRadius: '4px' }}><Eraser size={18} /></button>
                                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} disabled={isEraser} />
                                <input type="range" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} />
                                <button onClick={clearCanvas} style={{ cursor: 'pointer' }}><Trash2 size={18} /></button>
                                <button onClick={saveCanvas} style={{ background: 'var(--color-primary)', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                            </div>
                        </div>

                        <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            style={{
                                display: 'block',
                                border: '2px solid #000',
                                borderRadius: '4px',
                                background: '#ffffff',
                                cursor: 'crosshair',
                                touchAction: 'none',
                                maxWidth: '100%'
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}