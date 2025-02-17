export async function POST({ request }) {
    const body = await request.json();
  
    const response = await fetch("https://1qlewft2ie.execute-api.us-west-2.amazonaws.com/default/triggerEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    const data = await response.json();
  
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins (or specify your domain)
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }