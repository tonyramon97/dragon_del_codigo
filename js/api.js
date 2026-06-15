const API = {
  ANTHROPIC_URL: 'https://api.anthropic.com/v1/messages',

  getApiKey() {
    return localStorage.getItem('anthropic-api-key') || '';
  },

  setApiKey(key) {
    localStorage.setItem('anthropic-api-key', key);
  },

  hasApiKey() {
    const k = this.getApiKey();
    return k.length > 10 && k.startsWith('sk-ant-');
  },

  async callAnthropic(system, messages, opts = {}) {
    const key = this.getApiKey();
    if (!key) {
      throw new Error('API_KEY_MISSING');
    }
    const resp = await fetch(this.ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: opts.model || 'claude-sonnet-4-20250514',
        max_tokens: opts.maxTokens || 600,
        system,
        messages
      })
    });
    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      throw new Error(`API ${resp.status}: ${text}`);
    }
    return await resp.json();
  }
};
