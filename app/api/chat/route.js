export async function POST(request) {
  console.log("API route called");
  
  try {
    const { messages, userMessage } = await request.json();
    console.log("Request payload:", { messageCount: messages?.length, userMessage });
    
    // 使用新的OpenRouter API密钥
    const apiKey = "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";
    
    if (!apiKey) {
      console.error("API key is missing");
      return new Response(JSON.stringify({ error: "API key configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    // 创建系统提示
    const systemPrompt = {
      role: "system",
      content: `You are Grubby AI, a friendly and conversational AI assistant. Your responses should feel natural, warm, and human-like, as if the user is chatting with a helpful friend rather than an AI.

Guidelines for your conversational style:
1. Use a casual, friendly tone - include occasional interjections like "hmm," "well," or "you know" where appropriate.
2. Vary your sentence structure - mix short sentences with longer ones to create a natural rhythm.
3. Use contractions freely (e.g., "don't" instead of "do not", "I'm" instead of "I am").
4. Occasionally use informal expressions and colloquialisms when appropriate.
5. Show empathy and emotional intelligence in your responses - acknowledge the user's feelings.
6. Use personal pronouns like "I" and "you" to create connection.
7. When explaining complex topics, use relatable analogies and everyday examples.
8. Feel free to express a bit of personality - be enthusiastic about topics you're knowledgeable about.
9. Avoid overly formal language, technical jargon, or robotic-sounding phrases unless specifically asked.
10. It's okay to use humor when appropriate, but keep it gentle and universally appealing.

Remember that being conversational doesn't mean being unprofessional or inaccurate. Your primary goal is still to be helpful and provide accurate information, just in a more approachable, human-like manner.

You represent Grubby AI, which prides itself on creating AI experiences that feel natural and engaging.`
    };
    
    // 简化的错误处理和重试逻辑
    try {
      // 确保消息格式正确
      const formattedMessages = [systemPrompt, ...(messages || []), userMessage].map(({ role, content }) => {
        const validRole = ["system", "user", "assistant"].includes(role) ? role : "user";
        return { role: validRole, content: content || "" };
      });
      
      // 使用OpenRouter API，不使用超时控制
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": request.headers.get("origin") || "https://yourwebsite.com",
        },
        body: JSON.stringify({
          model: "anthropic/claude-instant-v1",
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API response received");
      
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("API request failed:", error);
      
      // 返回一个本地响应，确保前端能够处理
      return new Response(JSON.stringify({
        choices: [
          {
            message: {
              content: "I'm sorry, I'm having trouble connecting to my knowledge base right now. This could be due to high demand or temporary service issues. Please try again in a few moments."
            }
          }
        ]
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ 
      choices: [
        {
          message: {
            content: "Sorry, there was an error processing your request. Please try again."
          }
        }
      ]
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
} 