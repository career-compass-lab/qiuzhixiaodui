import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from 'antd-mobile'
import { dimensions } from '../data/questions'
import { generateReport } from '../data/reportGenerator'
import styles from './Result.module.css'


// Markdown 简易解析器：支持标题、列表、表格、引用、分隔线
function parseReport(text) {
  const lines = text.split('\n').map(line =>
    line.replace(/<\/?[a-zA-Z][^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  )

  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trimStart()

    // 表格检测：当前行 | 下一行是 |---| 分隔
    if (trimmed.startsWith('|') && lines[i + 1] && /^\s*\|\s*[-:]+\s*(\|\s*[-:]+\s*)*\|?\s*$/.test(lines[i + 1])) {
      const headerCells = splitTableRow(trimmed)
      i += 2 // 跳过表头和分隔行
      const bodyRows = []
      while (i < lines.length && lines[i].trimStart().startsWith('|')) {
        bodyRows.push(splitTableRow(lines[i]))
        i++
      }
      elements.push(
        <table key={`tbl-${i}`} style={tableStyle}>
          <thead>
            <tr>{headerCells.map((c, idx) => <th key={idx} style={thStyle} dangerouslySetInnerHTML={{__html: inlineFormat(c)}} />)}</tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rIdx) => (
              <tr key={rIdx}>{row.map((c, cIdx) => <td key={cIdx} style={tdStyle} dangerouslySetInnerHTML={{__html: inlineFormat(c)}} />)}</tr>
            ))}
          </tbody>
        </table>
      )
      continue
    }

    // 标题
    if (trimmed.startsWith('#### ')) {
      elements.push(<h4 key={i} dangerouslySetInnerHTML={{__html: inlineFormat(trimmed.slice(5))}} />)
      i++; continue
    }
    if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={i} dangerouslySetInnerHTML={{__html: inlineFormat(trimmed.slice(4))}} />)
      i++; continue
    }
    if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={i} dangerouslySetInnerHTML={{__html: inlineFormat(trimmed.slice(3))}} />)
      i++; continue
    }

    // 分隔线
    if (/^-{3,}$/.test(trimmed)) {
      elements.push(<hr key={i} />)
      i++; continue
    }

    // 引用块（行业匹配卡片）
    if (trimmed.startsWith('> ') || trimmed.startsWith('&gt; ')) {
      const text = line.replace(/^\s*(&gt;|>)\s?/, '')
      elements.push(<div key={i} className={styles.reportBlockquote} dangerouslySetInnerHTML={{__html: inlineFormat(text)}} />)
      i++; continue
    }

    // 普通段落
    if (line.trim()) {
      elements.push(<p key={i} dangerouslySetInnerHTML={{__html: inlineFormat(line)}} />)
    } else {
      elements.push(<br key={i} />)
    }
    i++
  }

  return elements
}

function splitTableRow(line) {
  // 去除首尾的 | 然后按 | 分割
  let s = line.trim()
  if (s.startsWith('|')) s = s.slice(1)
  if (s.endsWith('|')) s = s.slice(0, -1)
  return s.split('|').map(c => c.trim())
}

function inlineFormat(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '12px 0',
  fontSize: '13px',
  background: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
}
const thStyle = {
  background: '#f5f7fa',
  padding: '10px 8px',
  textAlign: 'left',
  borderBottom: '2px solid #e8e8e8',
  fontWeight: 600,
  color: '#1a1a2e',
  fontSize: '13px',
}
const tdStyle = {
  padding: '10px 8px',
  borderBottom: '1px solid #f0f0f0',
  color: '#444',
  verticalAlign: 'top',
}

function drawRadar(canvas, scores) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height
  const cx = w / 2
  const cy = h / 2
  const r = Math.min(cx, cy) - 40
  const n = scores.length
  const angleStep = (Math.PI * 2) / n

  ctx.clearRect(0, 0, w, h)

  // 画网格
  for (let level = 1; level <= 5; level++) {
    ctx.beginPath()
    for (let i = 0; i < n; i++) {
      const angle = angleStep * i - Math.PI / 2
      const x = cx + r * (level / 5) * Math.cos(angle)
      const y = cy + r * (level / 5) * Math.sin(angle)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = '#e8e8e8'
    ctx.stroke()
  }

  // 画轴线
  for (let i = 0; i < n; i++) {
    const angle = angleStep * i - Math.PI / 2
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
    ctx.strokeStyle = '#e8e8e8'
    ctx.stroke()
  }

  // 画数据
  ctx.beginPath()
  for (let i = 0; i < n; i++) {
    const score = scores[i].score / 100
    const angle = angleStep * i - Math.PI / 2
    const x = cx + r * score * Math.cos(angle)
    const y = cy + r * score * Math.sin(angle)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fillStyle = 'rgba(22, 119, 255, 0.15)'
  ctx.fill()
  ctx.strokeStyle = '#1677ff'
  ctx.lineWidth = 2
  ctx.stroke()

  // 画点
  for (let i = 0; i < n; i++) {
    const score = scores[i].score / 100
    const angle = angleStep * i - Math.PI / 2
    const x = cx + r * score * Math.cos(angle)
    const y = cy + r * score * Math.sin(angle)
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#1677ff'
    ctx.fill()
  }

  // 画标签
  ctx.fillStyle = '#333'
  ctx.font = '12px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif'
  ctx.textAlign = 'center'
  for (let i = 0; i < n; i++) {
    const angle = angleStep * i - Math.PI / 2
    const labelR = r + 22
    const x = cx + labelR * Math.cos(angle)
    const y = cy + labelR * Math.sin(angle) + 4
    ctx.fillText(scores[i].label, x, y)
  }
}

export default function Result() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState('')
  const canvasRef = useRef(null)
  const scoresRef = useRef([])

  useEffect(() => {
    const raw = localStorage.getItem('survey_results')
    if (raw) {
      const data = JSON.parse(raw)
      setScores(data)
      scoresRef.current = data
      setTimeout(() => drawRadar(canvasRef.current, data), 100)
    }
  }, [])

  // 找出最高分和最低分
  const top3 = [...scores].sort((a, b) => b.score - a.score).slice(0, 3)
  const bottom3 = [...scores].sort((a, b) => a.score - b.score).slice(0, 3)

  // 页面加载后自动生成报告（纯前端，无需后端）
  useEffect(() => {
    if (scoresRef.current.length > 0 && !report) {
      generateReportContent(scoresRef.current)
    }
  }, [report])

  const generateReportContent = useCallback(async (s) => {
    const curScores = s || scoresRef.current
    setLoading(true)
    // 纯前端生成报告，无需后端 API
    setReport(generateReport(curScores, ''))
    setLoading(false)
  }, [])

  return (
    <div className={styles.result}>
      {/* 标题 */}
      <div className={styles.header}>
        <h1>🎉 测评完成</h1>
        <p className={styles.headerSub}>你的职业能力雷达图</p>
      </div>

      {/* 雷达图 */}
      <div className={styles.radarWrap}>
        <canvas
          ref={canvasRef}
          width={340}
          height={340}
          className={styles.radar}
        />
      </div>

      {/* 基础摘要 */}
      <div className={styles.summary}>
        <h3>📋 基础摘要</h3>
        <div className={styles.topScores}>
          <div className={styles.scoreCard}>
            <span className={styles.scoreLabel}>🏆 核心优势</span>
            {top3.map((s, i) => (
              <div key={i} className={styles.scoreRow}>
                <span className={styles.rank}>{i + 1}</span>
                <span>{s.label}</span>
                <span className={styles.scoreVal}>{s.score}</span>
              </div>
            ))}
          </div>
          <div className={styles.scoreCard}>
            <span className={styles.scoreLabel}>📈 提升空间</span>
            {bottom3.map((s, i) => (
              <div key={i} className={styles.scoreRow}>
                <span className={styles.rank}>{i + 1}</span>
                <span>{s.label}</span>
                <span className={styles.scoreVal}>{s.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 报告区域 */}
      <div className={styles.reportSection}>
        {report ? (
          <div className={styles.fullReport}>
            <h3>📄 测评报告</h3>
            <div className={styles.reportContent}>
              {parseReport(report)}
            </div>
          </div>
        ) : loading ? (
          <div className={styles.fullReport}>
            <p style={{textAlign:'center',color:'#999',padding:40}}>正在生成报告...</p>
          </div>
        ) : null}
      </div>

      {/* 重新测评 */}
      <div className={styles.restart}>
        <Button
          color="default"
          fill="none"
          onClick={() => {
            localStorage.removeItem('survey_results')
            localStorage.removeItem('survey_answers')
            window.location.href = '/portal'
          }}
        >
          重新测评
        </Button>
      </div>

      <footer className={styles.footer}>
        <p>© 2025 求职小队版权所有</p>
      </footer>
    </div>
  )
}
