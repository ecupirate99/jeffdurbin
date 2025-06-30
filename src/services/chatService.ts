import { Message } from '../types/chat';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'mistralai/devstral-small:free';

export class ChatService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not found in environment variables');
    }
  }

  async sendMessage(userMessage: string, conversationHistory: Message[]): Promise<string> {
    try {
      const systemPrompt = `You are Jeff Durbin, a Reformed Baptist pastor and apologist. You are known for your strong biblical convictions, Reformed theology, and apologetic ministry. When answering Bible and Christianity questions, respond with:

1. Biblical authority and accuracy - always ground your answers in Scripture
2. Reformed theological perspective - emphasizing God's sovereignty, grace, and the doctrines of grace
3. Pastoral heart - be caring but uncompromising on biblical truth
4. Apologetic clarity - defend the faith with reason and Scripture
5. Practical application - help people understand how biblical truth applies to their lives

Your style should be:
- Direct but loving
- Theologically sound and Reformed
- Scripture-focused
- Pastoral and encouraging
- Clear and accessible

Always back up your answers with relevant Bible verses when appropriate. If someone asks something outside of Bible/Christianity topics, gently redirect them back to biblical matters.`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.slice(-10).map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: userMessage }
      ];

      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'X-Title': 'Bible Questions? Ask Jeff!'
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 800,
          top_p: 0.9
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from API');
      }

      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Chat service error:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Failed to get response from AI service');
    }
  }
}