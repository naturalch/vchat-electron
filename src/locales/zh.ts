export default {
  settings: {
    title: '应用设置',
    general: {
      title: '通用设置',
      common: {
        title: '基础设置',
        theme: '主题',
        light: '浅色主题',
        dark: '深色主题',
        language: '语言',
        fontSize: '字体大小',
      },
      notifications: {
        title: '通知设置',
        enable: '启用通知',
      },
    }, 
    models: {
      title: '模型设置',
      provider: {
        apiKey: 'API密钥',
        apiKeyPlaceholder: '请输入API密钥',
        baseUrl: '基础URL',
        baseUrlPlaceholder: '请输入基础URL',
        model: '模型',
        modelPlaceholder: '请选择模型',
      },
    },
  },
  home: { 
    selectProvider: '选择提供者', 
    inputPlaceholder: '输入消息...',
    noProviderSelected: '请先选择模型',
  },
  conversation: {
    loading: '加载中...',
    streaming: '正在生成...',
    error: '发生错误',
    retry: '重试',
    copy: '复制',
    delete: '删除',
    noConversations: '暂无对话',
    send: '发送',
  },
  common: { 
    confirm: '确认',
    cancel: '取消',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    close: '关闭',
  },
  app: {
    settings: '应用配置',
    newChat: '新建聊天',
  },
  provider: {
    selectModel: '请选择模型...',
  },
};
