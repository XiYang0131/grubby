export async function POST(request) {
  console.log("API route called");
  
  try {
    const { messages, userMessage } = await request.json();
    console.log("Request payload:", { messageCount: messages?.length, userMessage });
    
    // 中文响应模板
    const chineseResponses = [
      "您好！我是Grubby AI助手。很高兴为您服务。请问有什么我可以帮助您的？",
      "我理解您的问题，但我目前无法提供完整的回答。请稍后再试或者换一个问题。",
      "感谢您的问题！我正在处理中，但似乎遇到了一些技术问题。请稍后再试。",
      "您的问题很有趣，但我现在无法提供详细回答。请稍后再试或者提出另一个问题。",
      "我很抱歉，我现在无法连接到我的知识库。这可能是由于高需求或临时服务问题。请稍后再试。"
    ];
    
    // 根据用户输入选择响应
    let response = chineseResponses[Math.floor(Math.random() * chineseResponses.length)];
    
    // 如果用户问"who are you"或类似问题，返回特定回答
    if (userMessage.content.toLowerCase().includes("who are you") || 
        userMessage.content.includes("你是谁") ||
        userMessage.content.includes("你是什么")) {
      response = "我是Grubby AI，一个由HumanizeAI提供支持的智能助手。我可以帮助回答问题、提供信息和协助各种任务。很高兴认识您！";
    }
    
    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return new Response(JSON.stringify({
      choices: [
        {
          message: {
            content: response
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