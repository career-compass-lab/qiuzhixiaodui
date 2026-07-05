import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ProgressBar, Toast } from 'antd-mobile'
import { questions, dimensions } from '../data/questions'
import { submitAnswers } from '../api'
import styles from './Survey.module.css'

export default function Survey() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const total = questions.length
  const q = questions[current]
  const percent = Math.round(((current) / total) * 100)

  // 恢复之前选中的答案
  useEffect(() => {
    setSelected(answers[q.id] ?? null)
  }, [current, answers, q.id])

  const selectOption = useCallback((score) => {
    setSelected(score)
    setAnswers((prev) => ({ ...prev, [q.id]: score }))
    // 选完选项自动跳下一题（延迟让用户看到选中效果）
    setTimeout(() => {
      setCurrent((c) => {
        if (c < total - 1) return c + 1
        return c
      })
    }, 300)
  }, [q.id, total])

  const goNext = useCallback(() => {
    if (selected === null) return
    if (current < total - 1) {
      setCurrent((c) => c + 1)
    }
  }, [current, selected, total])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setCurrent((c) => c - 1)
    }
  }, [current])

  const handleSubmit = useCallback(async () => {
    if (selected === null) return
    if (current < total - 1) {
      goNext()
      return
    }

    // 最后一题 → 提交
    setSubmitting(true)
    try {
      const dimensionScores = {}
      questions.forEach((q) => {
        if (!dimensionScores[q.dimension]) dimensionScores[q.dimension] = { total: 0, count: 0 }
        dimensionScores[q.dimension].total += answers[q.id] || 3
        dimensionScores[q.dimension].count += 1
      })

      const results = Object.entries(dimensionScores).map(([key, v]) => ({
        key,
        dimension: key,
        label: dimensions.find((d) => d.key === key)?.label || key,
        score: Math.round((v.total / v.count) * 20),
      }))

      // 保存结果到 localStorage，供 result 页使用
      localStorage.setItem('survey_results', JSON.stringify(results))
      localStorage.setItem('survey_answers', JSON.stringify(answers))

      // 如果有后端，提交答案
      try {
        const res = await submitAnswers({ answers, results })
        if (res?.reportId) {
          localStorage.setItem('report_id', res.reportId)
        }
      } catch (e) {
        // 后端不可用时仍可继续
      }

      navigate('/result')
    } catch (e) {
      Toast.show({ content: '提交失败，请重试' })
    }
    setSubmitting(false)
  }, [current, selected, total, answers, goNext, navigate])

  if (!q) {
    return <div className={styles.empty}>加载中...</div>
  }

  const isLast = current === total - 1

  return (
    <div className={styles.survey}>
      {/* 头部进度 */}
      <div className={styles.header}>
        <div className={styles.progressBar}>
          <ProgressBar percent={percent} style={{ '--track-width': '6px', '--fill-color': '#1677ff' }} />
        </div>
        <div className={styles.progressInfo}>
          <span>第 {current + 1}/{total} 题</span>
          <span className={styles.dimLabel}>{dimensions.find(d => d.key === q.dimension)?.label}</span>
        </div>
      </div>

      {/* 题目区 */}
      <div className={styles.questionArea}>
        <div className={styles.questionNum}>Q{current + 1}</div>
        <h2 className={styles.questionText}>{q.text}</h2>

        <div className={styles.options}>
          {q.options.map((opt) => (
            <div
              key={opt.label}
              className={`${styles.option} ${selected === opt.score ? styles.optionSelected : ''}`}
              onClick={() => selectOption(opt.score)}
            >
              <span className={styles.optionLabel}>{opt.label}</span>
              <span className={styles.optionText}>{opt.text}</span>
              {selected === opt.score && <span className={styles.check}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 底部按钮 */}
      <div className={styles.actions}>
        <Button
          color="default"
          fill="none"
          onClick={goPrev}
          disabled={current === 0}
        >
          上一题
        </Button>
        <Button
          color="primary"
          onClick={handleSubmit}
          disabled={selected === null}
          loading={submitting}
          className={styles.nextBtn}
        >
          {isLast ? '完成测试' : '下一题'}
        </Button>
      </div>
    </div>
  )
}
