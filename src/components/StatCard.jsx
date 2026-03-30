// src/components/StatCard.jsx
import React from 'react'

export default function StatCard({ title, percentage, color, bgColor, icon }) {
    return (
        <div className="stat-card">
            <div className="stat-header">
                <div className="stat-icon" style={{ backgroundColor: bgColor, color: color }}>
                    {icon}
                </div>
                <h3 className="stat-title">{title}</h3>
            </div>
            <div className="stat-body">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="stat-label">Daily Goal Rate</span>
                    <span className="stat-label" style={{ color: color, fontWeight: 600 }}>{percentage}%</span>
                </div>
                <div className="stat-progress-bg">
                    <div
                        className="stat-progress-fill"
                        style={{ width: `${percentage}%`, backgroundColor: color }}
                    ></div>
                </div>
            </div>
        </div>
    )
}