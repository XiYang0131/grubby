export async function POST(request) {
  const { messages, userMessage } = await request.json();
  
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        "HTTP-Referer": request.headers.get("origin") || "https://yourwebsite.com",
      },
      body: JSON.stringify({
        model: "openrouter/optimus-alpha",
        messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
      }),
    });
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "API请求失败" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
} 