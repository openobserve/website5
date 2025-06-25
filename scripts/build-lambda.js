import fs from "fs";
import path from "path";

// Create lambda directory
const lambdaDir = "dist/lambda";
if (!fs.existsSync(lambdaDir)) {
  fs.mkdirSync(lambdaDir, { recursive: true });
}

// Lambda wrapper template
const createLambdaWrapper = (apiPath) => `
import { handler as astroHandler } from '../server/entry.mjs';

export const handler = async (event, context) => {
  try {
    // Convert AWS Lambda event to standard Request
    const url = new URL(event.path, 'https://example.com');
    if (event.queryStringParameters) {
      Object.entries(event.queryStringParameters).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    const request = new Request(url.toString(), {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    });

    // Call Astro handler
    const response = await astroHandler(request);
    
    // Convert Response to AWS Lambda format
    const body = await response.text();
    
    return {
      statusCode: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: body,
    };
  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
`;

// Create Lambda functions for each API route
const apiRoutes = [
  { name: "webinar-register", path: "/api/webinar-register" },
  { name: "webinars-sync", path: "/api/webinars-sync" },
];

apiRoutes.forEach((route) => {
  const lambdaCode = createLambdaWrapper(route.path);
  fs.writeFileSync(path.join(lambdaDir, `${route.name}.js`), lambdaCode);
  console.log(`✅ Created Lambda function: ${route.name}.js`);
});

console.log("🚀 Lambda functions built successfully!");
