const structure = [
  {
    name: '管理員系統',
    flows: [
      { name: '上架商品', pages: ['寫商品頁面', '填入商品資訊', '商品審核'] },
      { name: '訂單管理', pages: ['建立訂單管理中心', '訂單庫存更新', '訂單庫存管理'] },
      { name: '庫存管理', pages: ['建立庫存管理中心', '庫存變更紀錄'] },
    ],
  },
  {
    name: '會員系統',
    flows: [
      { name: '註冊會員', pages: ['建立會員頁面', '輸入會員資料', '設定會員專屬標籤'] },
      { name: '會員資料', pages: ['建立會員資料頁面', '輸入並編輯資料', '設定觸發條件'] },
    ],
  },
  {
    name: '商品頁面',
    flows: [
      { name: '商品頁面', pages: ['分類整理', '商品分類', '商品搜尋'] },
      { name: '購物車', pages: ['加入購物車', '可能會買的推薦商品'] },
    ],
  },
]

const categories = [
  {
    name: '管理員系統',
    description: '維持商品、訂單與庫存順暢的內部流程。',
    features: ['上架審核', '訂單更新', '庫存調整'],
    owner: '營運部',
    icon: '🗂️',
  },
  {
    name: '會員系統',
    description: '會員註冊、資料與標籤任務，支持成長回饋。',
    features: ['註冊導流', '資料管理', '觸發任務'],
    owner: '成長團隊',
    icon: '👤',
  },
  {
    name: '商品頁面',
    description: '前台商品展示、搜尋與購物車推薦。',
    features: ['分類瀏覽', '搜尋結果', '個人化推薦'],
    owner: '前端團隊',
    icon: '🛍️',
  },
]

const memberBadges = [
  { title: '註冊任務完成', desc: '填寫基本資料並驗證信箱。', level: '新手' },
  { title: '建立首筆訂單', desc: '完成第一筆訂單並回饋評價。', level: '熟客' },
  { title: '常購商品設定', desc: '將常購品加入收藏或訂閱補貨。', level: '熟客' },
  { title: '願望清單達人', desc: '收藏多項商品並分享給好友。', level: '行家' },
]

const products = [
  {
    name: '智慧藍牙耳機',
    subtitle: '主動降噪 · 30 小時續航',
    description: '具備多裝置切換與快速充電的無線耳機，隨時享受好聲音。',
    price: 'NT$2,980',
    tags: ['降噪', '藍牙 5.3', '快充'],
  },
  {
    name: '都會輕旅背包',
    subtitle: '防潑水 · 15 吋筆電夾層',
    description: '兼具通勤與旅行機能的大容量背包，附設 USB 充電孔。',
    price: 'NT$1,680',
    tags: ['旅行', '防潑水', 'USB 充電'],
  },
  {
    name: '可換濾心保溫瓶',
    subtitle: '316 不鏽鋼 · 750ml',
    description: '可替換濾心的真空保溫瓶，保溫 12 小時、保冷 24 小時。',
    price: 'NT$920',
    tags: ['保溫', '濾心', '環保'],
  },
]

const app = Vue.createApp({
  setup() {
    const totalNodes = Vue.computed(() =>
      structure.reduce(
        (total, section) => total + section.flows.reduce((sum, flow) => sum + flow.pages.length + 1, 1),
        0,
      ),
    )

    const cartItems = Vue.reactive([])
    const lastAction = Vue.ref('')

    const cartCount = Vue.computed(() => cartItems.length)

    const addToCart = (product) => {
      const now = new Date()
      cartItems.push({
        ...product,
        id: `${product.name}-${now.getTime()}`,
        addedAt: now.toLocaleTimeString('zh-TW', { hour12: false }),
      })
      lastAction.value = `${product.name} 已加入購物車！`
    }

    return {
      structure,
      categories,
      memberBadges,
      products,
      totalNodes,
      cartItems,
      cartCount,
      addToCart,
      lastAction,
    }
  },
})

app.mount('#app')
