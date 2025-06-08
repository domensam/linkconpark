"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface ActivityData {
  date: string
  count: number
}

interface ActivityGraphProps {
  data: ActivityData[]
  colorScheme?: "green" | "blue" | "purple"
}

// Generate sample data for the last 52 weeks
const generateSampleData = (): ActivityData[] => {
  const data: ActivityData[] = []
  const today = new Date()
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5), // Random activity count between 0-4
    })
  }
  
  return data.reverse()
}

export function ActivityGraph({ data = generateSampleData(), colorScheme = "green" }: ActivityGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const colorMap = {
    green: ["#e6f7e9", "#bae6c2", "#74c686", "#2ea043", "#216e39"],
    blue: ["#e6f1f7", "#b6d9e6", "#6bb1d9", "#2188c6", "#175d8d"],
    purple: ["#f2e6f7", "#d9b6e6", "#b16bd9", "#8821c6", "#5d178d"],
  }

  const getColor = (count: number) => {
    const colors = colorMap[colorScheme]
    if (count === 0) return colors[0]
    if (count <= 2) return colors[1]
    if (count <= 4) return colors[2]
    if (count <= 6) return colors[3]
    return colors[4]
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const cellSize = 10
    const gap = 2
    const cols = 52 // weeks in a year
    const rows = 7 // days in a week
    
    canvas.width = cols * (cellSize + gap)
    canvas.height = rows * (cellSize + gap)

    // Draw activity cells
    data.forEach((item, index) => {
      const col = Math.floor(index / 7)
      const row = index % 7
      
      const x = col * (cellSize + gap)
      const y = row * (cellSize + gap)

      ctx.fillStyle = getColor(item.count)
      ctx.fillRect(x, y, cellSize, cellSize)
      ctx.strokeStyle = "rgba(0,0,0,0.1)"
      ctx.strokeRect(x, y, cellSize, cellSize)
    })
  }, [data, colorScheme])

  return (
    <Card className="p-4 overflow-x-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Activity Graph</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Less</span>
            {colorMap[colorScheme].map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: color }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: "120px" }}
        />
      </div>
    </Card>
  )
}
