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
    
    console.log("Sending request to OpenRouter with payload");
    
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
    
    let retries = 0;
    const maxRetries = 2;
    let lastError = null;

    while (retries <= maxRetries) {
      try {
        // 使用OpenRouter API
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": request.headers.get("origin") || "https://yourwebsite.com",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [systemPrompt, ...(messages || []), userMessage].map(({ role, content }) => ({ role, content })),
            temperature: 0.7, // 添加温度参数控制创造性
            max_tokens: 1000, // 控制响应长度
          }),
        });
        
        console.log("OpenRouter response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`OpenRouter API error (attempt ${retries+1}/${maxRetries+1}):`, errorText);
          lastError = errorText;
          retries++;
          
          if (retries <= maxRetries) {
            console.log(`Retrying in 1 second... (attempt ${retries+1}/${maxRetries+1})`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          } else {
            return new Response(JSON.stringify({ error: `API request failed after ${maxRetries+1} attempts` }), {
              status: 500,
              headers: { "Content-Type": "application/json" }
            });
          }
        }
        
        const data = await response.json();
        console.log("API response received");
        
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error("API route error:", error);
        retries++;
        
        if (retries <= maxRetries) {
          console.log(`Retrying after error... (attempt ${retries+1}/${maxRetries+1})`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
      }
    }
    
    // 确保在所有重试失败后返回一个响应
    return new Response(JSON.stringify({ 
      error: lastError || "Failed to get response after multiple attempts" 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
    
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ error: error.message || "Unknown error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
} 