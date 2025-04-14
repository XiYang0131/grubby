export async function POST(request) {
  console.log("API route called");
  
  try {
    const { messages, userMessage } = await request.json();
    console.log("Request payload:", { messageCount: messages?.length, userMessage });
    
    // 使用新的API密钥
    const apiKey = "sk_h2rpx0mcrai6dth5vkd2jn";
    
    if (!apiKey) {
      console.error("API key is missing");
      return new Response(JSON.stringify({ error: "API key configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    console.log("Sending request to HumanizeAI with payload");
    
    let retries = 0;
    const maxRetries = 2;
    let lastError = null;

    while (retries <= maxRetries) {
      try {
        // 更新为HumanizeAI的API端点
        const response = await fetch("https://www.humanizeai.pro/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            // 根据HumanizeAI的API格式调整请求体
            messages: [...(messages || []), userMessage].map(({ role, content }) => ({ role, content })),
          }),
        });
        
        console.log("HumanizeAI response status:", response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`HumanizeAI API error (attempt ${retries+1}/${maxRetries+1}):`, errorText);
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
        
        // 根据HumanizeAI的响应格式调整
        // 如果HumanizeAI的响应格式与OpenRouter不同，可能需要转换
        const formattedResponse = {
          choices: [
            {
              message: {
                content: data.response || data.message || data.content || data.choices?.[0]?.message?.content
              }
            }
          ]
        };
        
        return new Response(JSON.stringify(formattedResponse), {
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