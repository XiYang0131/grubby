export async function POST(request) {
  const { messages, userMessage } = await request.json();
  
  try {
    console.log("API route called with:", { messages, userMessage });
    
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.error("API key is missing");
      return new Response(JSON.stringify({ error: "API key configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    console.log("Sending request to OpenRouter with payload:", {
      model: "openai/gpt-3.5-turbo",
      messages: [...(messages || []), userMessage].map(({ role, content }) => ({ role, content })),
    });
    
    let retries = 0;
    const maxRetries = 2;
    let lastError = null;

    while (retries <= maxRetries) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": request.headers.get("origin") || "https://yourwebsite.com",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [...(messages || []), userMessage].map(({ role, content }) => ({ role, content })),
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
        console.log("API response:", data);
        
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      } catch (error) {
        console.error("API route error:", error);
        retries++;
      }
    }
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
} 