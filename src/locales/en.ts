export default {
  settings: {
    title: 'App Settings',
    general: {
      title: 'General Settings',
      common: {
        title: 'Common Settings',
        theme: 'Theme',
        light: 'Light Theme',
        dark: 'Dark Theme',
        language: 'Language',
        fontSize: 'Font Size',
      },
      notifications: {
        title: 'Notification Settings', 
        enable: 'Enable Notifications',
      },
    },
    models: {
      title: 'Model Settings',
      provider: {
        apiKey: 'API Key',
        apiKeyPlaceholder: 'Enter API Key',
        baseUrl: 'Base URL',
        baseUrlPlaceholder: 'Enter Base URL',
        model: 'Model',
        modelPlaceholder: 'Select Model',
      },
    },
  },
  home: {
    selectProvider: 'Select Provider',
    inputPlaceholder: 'Type a message...',
    noProviderSelected: 'Please select a model first',
  },
  conversation: {
    loading: 'Loading...',
    streaming: 'Generating...',
    error: 'Error occurred',
    retry: 'Retry',
    copy: 'Copy',
    delete: 'Delete',
    noConversations: 'No conversations yet',
    send: 'Send',
  },
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
  },
};
