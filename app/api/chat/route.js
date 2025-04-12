const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
    "HTTP-Referer": window.location.origin,
  },
  body: JSON.stringify({
    model: "openrouter/optimus-alpha",
    messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
  }),
}); 