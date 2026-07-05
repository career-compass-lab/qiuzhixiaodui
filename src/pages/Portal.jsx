import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd-mobile'
import styles from './Portal.module.css'

const features = [
  { icon: '🧠', title: 'AI 深度解析', desc: '7维职业能力精准画像' },
  { icon: '⚡', title: '5分钟快速', desc: '50题轻松完成' },
  { icon: '🔒', title: '隐私安全', desc: '数据本地处理' },
]

const testimonials = [
  { text: '"转行前做了这个测评，方向清晰了很多"', name: '张同学' },
  { text: '"5分钟就做完了，报告很详细"', name: '小王' },
  { text: '"朋友推荐的，确实比自己瞎想要靠谱"', name: '李女士' },
]

export default function Portal() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onStart = useCallback(() => {
    setLoading(true)
    navigate('/survey')
  }, [navigate])

  return (
    <div className={styles.portal}>
      <div className={styles.content}>
        {/* 品牌区 */}
        <div className={styles.brand}>求职小队</div>

        {/* 主标题 */}
        <div className={styles.hero}>
          <div className={styles.heroIcon}>🧭</div>
          <h1 className={styles.title}>职业优势与倾向测评</h1>
          <p className={styles.subtitle}>5分钟，AI 解读你的职业潜力</p>
          <p className={styles.count}>已有 10,000+ 人完成测评</p>
        </div>

        {/* 卖点区 */}
        <div className={styles.features}>
          {features.map((f, i) => (
            <div key={i} className={styles.featureItem}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* 开始按钮 */}
        <div className={styles.startSection}>
          <Button
            block
            color="primary"
            size="large"
            loading={loading}
            onClick={onStart}
            className={styles.submitBtn}
          >
            开始测评
          </Button>
          <p className={styles.agreement}>
            点击开始即表示同意《用户协议》和《隐私政策》
          </p>
        </div>

        {/* 评价区 */}
        <div className={styles.testimonials}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testimonialItem}>
              <p className={styles.testimonialText}>{t.text}</p>
              <p className={styles.testimonialName}>— {t.name}</p>
            </div>
          ))}
        </div>

        {/* 关注区 */}
        <div className={styles.follow}>
          <h3>加好友，获取更多求职帮助</h3>
          <div className={styles.qrPlaceholder}>
            <img className={styles.qrImage} src="/qrcode.jpg" alt="企业微信二维码" />
            <p className={styles.qrHint}>扫码添加求职小队企业微信</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2025 求职小队版权所有</p>
      </footer>
    </div>
  )
}
