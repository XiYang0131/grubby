export async function POST(request) {
  const { messages, userMessage } = await request.json();
  
  try {
    console.log("API route called with:", { messages, userMessage });
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        "HTTP-Referer": request.headers.get("origin") || "https://yourwebsite.com",
      },
      body: JSON.stringify({
        model: "openrouter/optimus-alpha",
        messages: [...(messages || []), userMessage].map(({ role, content }) => ({ role, content })),
      }),
    });
    
    if (!response.ok) {
      console.error("OpenRouter API error:", await response.text());
      return new Response(JSON.stringify({ error: "API request failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    const data = await response.json();
    console.log("API response:", data);
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
} 