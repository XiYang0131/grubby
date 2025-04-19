export async function POST(request) {
  console.log("API route called");
  
  try {
    const { messages, userMessage } = await request.json();
    console.log("Request payload:", { messageCount: messages?.length, userMessage });
    
    // 使用本地模拟响应
    const mockResponses = [
      "我很抱歉，我现在无法连接到我的知识库。这可能是由于高需求或临时服务问题。请稍后再试。",
      "我理解您的问题，但我目前无法提供完整的回答。请稍后再试或者换一个问题。",
      "感谢您的问题！我正在处理中，但似乎遇到了一些技术问题。请稍后再试。",
      "我很乐意帮助您解决这个问题，但我现在遇到了连接问题。请稍后再试。",
      "您的问题很有趣，但我现在无法提供详细回答。请稍后再试或者提出另一个问题。"
    ];
    
    // 随机选择一个响应
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return new Response(JSON.stringify({
      choices: [
        {
          message: {
            content: randomResponse
          }
        }
      ]
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ 
      choices: [
        {
          message: {
            content: "抱歉，处理您的请求时出现了错误。请再试一次。"
          }
        }
      ]
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
} 