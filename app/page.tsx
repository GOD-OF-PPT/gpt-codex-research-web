'use client'
import { useState } from 'react'

const NAV = [
  { id: 'summary', label: '结论摘要' },
  { id: 'models', label: '模型对比' },
  { id: 'plans', label: '采购方案' },
  { id: 'limits', label: '限额风险' },
  { id: 'faq', label: '常见问题' },
]

function NavBar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="font-bold text-blue-600 text-sm">GPT Codex 采购调研 2026</span>
        <nav className="hidden md:flex gap-6">
          {NAV.map(n => <a key={n.id} href={`#${n.id}`} className="text-sm text-slate-600 hover:text-blue-600 transition-colors">{n.label}</a>)}
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="菜单">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M6 18L18 6M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
          {NAV.map(n => <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="text-sm text-slate-700 py-1">{n.label}</a>)}
        </div>
      )}
    </header>
  )
}

function Badge({ text, color }: { text: string; color: string }) {
  return <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${color}`}>{text}</span>
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-xl border border-slate-100 shadow-sm p-5 ${className}`}>{children}</div>
}

function SH({ id, title, desc }: { id: string; title: string; desc?: string }) {
  return (
    <div id={id} className="pt-16 mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1 h-6 bg-blue-600 rounded-full"/>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      {desc && <p className="text-slate-500 text-sm ml-4">{desc}</p>}
    </div>
  )
}

function Tbl({ headers, rows, hi }: { headers: string[]; rows: string[][]; hi?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-max">
        <thead><tr className="border-b border-slate-100">
          {headers.map((h, i) => <th key={i} className="text-left py-3 pr-6 font-semibold text-slate-700 whitespace-nowrap">{h}</th>)}
        </tr></thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={`border-b border-slate-50 transition-colors ${hi === ri ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
              {row.map((cell, ci) => <td key={ci} className={`py-3 pr-6 ${ci === 0 ? 'font-medium text-slate-800' : 'text-slate-600'}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Home() {
  const [activeQ, setActiveQ] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar />

      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge text="2026年3月26日" color="bg-blue-50 text-blue-700 border-blue-200" />
              <Badge text="45人开发团队" color="bg-slate-50 text-slate-600 border-slate-200" />
              <Badge text="内部实测数据" color="bg-green-50 text-green-700 border-green-200" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              GPT Codex Team 采购席位调研报告
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              基于 OpenAI 官方定价、Rate Card、GitHub 社区反馈及 OpenRouter 实时数据，为 45 人开发团队提供完整的 GPT Codex 采购方案分析。
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#summary" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                查看结论
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="https://github.com/GOD-OF-PPT/team-gpt-research" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
                查看报告源文件
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* 结论摘要 */}
        <SH id="summary" title="一、结论摘要" desc="快速结论，供决策参考" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="md:col-span-2">
            <h3 className="font-semibold text-slate-900 mb-3">推荐采购方案</h3>
            <Tbl
              headers={['组成', '月费', '说明']}
              rows={[
                ['Business 45席', '$1,350', '含 SSO、共享 credits 池、云端任务'],
                ['Credits 超额预算', '~$450', '$10/人，覆盖重度用户超额'],
                ['API Key（CI/CD）', '~$200', '自动化任务按量，不占订阅限额'],
                ['合计', '~$2,000/月', '约 ¥14,500/月'],
              ]}
              hi={3}
            />
          </Card>
          <div className="flex flex-col gap-4">
            <Card className="bg-blue-600 text-white border-blue-600">
              <div className="text-3xl font-bold mb-1">$2,000</div>
              <div className="text-white text-sm font-medium">推荐月度总成本</div>
              <div className="text-white text-xs mt-2 opacity-90">约 ¥14,500/月</div>
            </Card>
            <Card>
              <div className="text-2xl font-bold text-slate-900 mb-1">45席</div>
              <div className="text-slate-500 text-sm">Business 方案</div>
              <div className="text-slate-400 text-xs mt-2">$30/人/月</div>
            </Card>
          </div>
        </div>
        <Card className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">三条关键结论</h3>
          <div className="space-y-3">
            {[
              ['Business 方案限额充分性', '对中等强度用户够用，重度用户（≥6h/天）约1–2天耗尽周限额，需配合 credits 补充'],
              ['订阅 vs 纯 API', '官方订阅比纯 API 调用 GPT-5.3-Codex 便宜 2.2 倍，且含云端任务和代码审查'],
              ['模型选择策略', '日常任务优先用 GPT-5.4-mini（成本降 3.5 倍），复杂任务用 GPT-5.3-Codex'],
            ].map(([title, desc], i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                <div><span className="font-medium text-slate-800">{title}：</span><span className="text-slate-600 text-sm">{desc}</span></div>
              </div>
            ))}
          </div>
        </Card>

        {/* 模型对比 */}
        <SH id="models" title="二、模型能力与 API 定价对比" />
        <Card className="mb-4">
          <h3 className="font-semibold text-slate-900 mb-3">OpenAI 模型横向对比</h3>
          <Tbl
            headers={['模型', '输入 $/1M', '输出 $/1M', '延迟', '上下文', '日常编码']}
            rows={[
              ['GPT-5.4 Pro', '$30（≤272K）', '$180', '~139s', '1.05M', '❌ 不推荐'],
              ['GPT-5.4', '$2.50（≤272K）', '$15.00', '~1.89s', '1.05M', '✓ 推荐'],
              ['GPT-5.3-Codex', '$1.75', '$14.00', '~9.56s', '400K', '★ 强烈推荐'],
              ['GPT-5.4-mini', '$0.75', '$4.50', '~0.58s', '400K', '★ 首选'],
            ]}
            hi={3}
          />
        </Card>
        <Card className="mb-4">
          <h3 className="font-semibold text-slate-900 mb-3">Claude 模型对比（仅 API 模式）</h3>
          <Tbl
            headers={['模型', '输入 $/1M', '输出 $/1M', '提供商数', 'Codex 订阅', '月均 API 成本']}
            rows={[
              ['Claude Sonnet 4.6', '$3.00', '$15.00', '5家', '❌ 否', '~$78/人'],
              ['Claude Opus 4.6', '$5.00', '$25.00', '4家', '❌ 否', '~$130/人'],
              ['GPT-5.3-Codex（参考）', '$1.75', '$14.00', '2家', '✓ 是', '~$66/人'],
            ]}
          />
          <p className="text-xs text-slate-500 mt-3">⚠ Claude 模型仅支持 API 模式，不含 Codex 云端任务和代码审查。混用 GPT+Claude 建议通过 OpenRouter 统一管理。</p>
        </Card>
        <Card className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">思维链深度 vs 费用</h3>
          <Tbl
            headers={['推理深度', '参数', '估算单次费用（API）', '相对倍数', '建议']}
            rows={[
              ['无推理', 'none', '~$0.01', '1x', '低延迟场景'],
              ['默认', 'medium', '~$0.08–0.23', '8–23x', '✓ 日常推荐'],
              ['高', 'high', '~$0.30–0.75', '30–75x', '复杂架构'],
              ['极高', 'xhigh', '~$0.75–3.00', '75–300x', 'API Key 模式'],
            ]}
            hi={1}
          />
          <p className="text-xs text-slate-500 mt-3">社区实测：xhigh 解决疑难 bug 消耗 $4.14，耗时 45 分钟。订阅方案下高推理深度会加速消耗 credits。</p>
        </Card>

        {/* 采购方案 */}
        <SH id="plans" title="三、采购方案建议" />
        <Card className="mb-4">
          <h3 className="font-semibold text-slate-900 mb-3">三种方案对比（45人团队）</h3>
          <Tbl
            headers={['方案', '席位构成', '月费', '年费', '适合情况']}
            rows={[
              ['全员 Business ✓推荐', '45席', '$1,350', '$16,200', '中等强度，有团队管理需求'],
              ['分级采购', '5 Pro + 40 Business', '$2,200', '$26,400', '有核心重度用户'],
              ['全员 Pro', '45席', '$9,000', '$108,000', '全员全职重度（性价比低）'],
              ['Enterprise', '联系销售', '—', '—', '合规优先，弹性计费'],
            ]}
            hi={0}
          />
        </Card>
        <Card className="mb-4">
          <h3 className="font-semibold text-slate-900 mb-3">官方订阅 vs OpenRouter API（45人月度对比）</h3>
          <Tbl
            headers={['使用场景', '官方 Business', 'OpenRouter API', '建议']}
            rows={[
              ['轻度（50条/天，mini）', '$1,350（固定）', '~$540', 'OpenRouter 省 60%'],
              ['中等（100条/天，Codex）', '$1,350', '~$2,970', '官方便宜 2.2x ★'],
              ['重度（200条/天）', '~$2,000（含credits）', '~$5,940', '官方便宜 3x'],
              ['混合 GPT+Claude', '$1,350+Claude另算', '按量统一账单', 'OpenRouter 更灵活'],
            ]}
            hi={1}
          />
        </Card>
        <Card className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">不推荐的方案</h3>
          <div className="space-y-2">
            {[
              ['全员 Pro', '$9,000/月，是 Business 的 6.7 倍，但重度用户同样约 2 天触发周限额'],
              ['纯 API 模式', 'GPT-5.3-Codex 约 $66/人/月，无团队管理，无云端任务和代码审查'],
              ['GPT-5.4 Pro API', '$30/1M 输入，延迟 139s，不适合日常编码'],
            ].map(([title, desc], i) => (
              <div key={i} className="flex gap-3 p-3 bg-red-50 rounded-lg">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                <div><span className="font-medium text-red-800">{title}：</span><span className="text-red-700 text-sm">{desc}</span></div>
              </div>
            ))}
          </div>
        </Card>

        {/* 限额风险 */}
        <SH id="limits" title="四、使用限额风险评估" />
        <Card className="mb-4">
          <h3 className="font-semibold text-slate-900 mb-3">限额充分性分析</h3>
          <Tbl
            headers={['用户强度', '5小时窗口体验', '周限额体验', '风险']}
            rows={[
              ['轻度（≤4h/天）', '基本够用', '不会触发', '低'],
              ['中等（4–6h/天）', '偶尔触发，等约30分钟', '约4–5天触发', '中'],
              ['重度（≥6h/天）', '约2小时达上限', '约1–2天耗尽', '高'],
            ]}
            hi={2}
          />
        </Card>
        <Card className="mb-4">
          <h3 className="font-semibold text-slate-900 mb-3">内部实测数据</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
              <p className="text-amber-800 font-medium text-sm">实测结论</p>
            </div>
            <p className="text-amber-700 text-sm">全新 ChatGPT Business（Team）账号，使用 GPT-5.4 + GPT-5.3-Codex 进行重度编码，<strong>5小时内即用尽限额</strong>，5小时窗口与周限额双重约束同时生效。</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: '全新账号初始额度', src: '/images/new_team_account.png' },
              { label: '周额度剩余', src: '/images/week_quota_left.png' },
              { label: '5小时限额用尽', src: '/images/5_hours_out_of_quota.png' },
              { label: 'Token 使用详情', src: '/images/5_hours_limit_token_usage.png' },
            ].map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                <img src={item.src} alt={item.label} className="w-full object-cover" />
                <p className="text-xs text-slate-600 text-center py-2 px-1">{item.label}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">应对策略（按优先级）</h3>
          <div className="space-y-2">
            {[
              ['切换 GPT-5.4-mini', '成本降 3.5 倍，限额延长 3.3 倍，无额外费用', 'green'],
              ['购买 workspace credits', '$10/1000 credits，团队共享池，立即续期', 'green'],
              ['CI/CD 走 API Key', '不占订阅限额，按量计费', 'blue'],
              ['控制推理深度', '日常默认 medium，避免 xhigh 过快消耗', 'blue'],
              ['精简上下文', '压缩 AGENTS.md，关闭不需要的 MCP 服务器', 'slate'],
            ].map(([title, desc, color], i) => {
              const colors: Record<string, string> = {
                green: 'bg-green-50 border-green-200',
                blue: 'bg-blue-50 border-blue-200',
                slate: 'bg-slate-50 border-slate-200',
              }
              return (
                <div key={i} className={`flex gap-3 p-3 rounded-lg border ${colors[color]}`}>
                  <span className="w-5 h-5 rounded-full bg-white border border-slate-200 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                  <div><span className="font-medium text-slate-800">{title}：</span><span className="text-slate-600 text-sm">{desc}</span></div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* FAQ */}
        <SH id="faq" title="五、常见问题解答" desc="决策者关键问题" />
        <div className="space-y-3 mb-6">
          {[
            {
              q: 'Q1：45席 Business 够用吗？不够用怎么办？',
              a: '中等强度够用，重度用户需配合 credits 补充。够用条件：每天编码 ≤4h，日常用 GPT-5.4-mini，CI/CD 走 API Key。不够用时：切换 mini → 购买 credits → 超额用 API Key → 核心成员升 Pro。',
            },
            {
              q: 'Q2：API调用层面官方价格比 OpenRouter 便宜吗？',
              a: '价格完全相同。OpenRouter → OpenAI 与官方直连价格一致。OpenRouter 额外优势：Azure/GCP 路由提供 Zero retention 合规选项，缓存命中优化（GPT-5.4-mini 实际均价降 67%），OpenAI+Anthropic 统一账单。',
            },
            {
              q: 'Q3：xhigh 思维链比默认贵多少？',
              a: '估算 xhigh 比默认 medium 贵约 5–15 倍。xhigh 单次任务估算 $0.75–3.00（API），社区实测解决疑难 bug 消耗 $4.14/次。建议日常默认 medium，疑难 bug 才启用 xhigh，且优先走 API Key 模式按量计费。',
            },
            {
              q: 'Q4：官方 Team 席位 vs OpenRouter API，哪个更划算？',
              a: '按使用强度决定。中等强度主力任务：官方订阅便宜 2.2 倍且含云端任务。轻度用户或 CI/CD：OpenRouter API 更省（省 60%）。需要 Claude 模型：OpenRouter 统一管理更灵活。综合建议：主力任务用官方 Business，CI/CD 和轻度任务用 OpenRouter API，月度成本约 $1,550–2,000。',
            },
          ].map((item, i) => (
            <Card key={i} className="cursor-pointer" >
              <button
                className="w-full text-left flex items-start justify-between gap-4"
                onClick={() => setActiveQ(activeQ === i ? null : i)}
              >
                <span className="font-semibold text-slate-900 text-sm">{item.q}</span>
                <svg className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform ${activeQ === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
              </button>
              {activeQ === i && (
                <p className="mt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">{item.a}</p>
              )}
            </Card>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="font-bold text-slate-900 mb-1">GPT Codex Team 采购调研</div>
              <div className="text-slate-500 text-sm">调研日期：2026年3月26日 · 调研对象：45人开发团队</div>
            </div>
            <div className="flex flex-col gap-1 text-sm text-slate-500">
              <a href="https://developers.openai.com/codex/pricing" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Codex 官方定价页</a>
              <a href="https://github.com/GOD-OF-PPT/team-gpt-research" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">GitHub 报告仓库</a>
              <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">OpenRouter 定价参考</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
