import { createFileRoute } from "@tanstack/react-router";

import { BACKEND_API_ORIGIN } from "@/lib/botsync-config";

function buildTargetUrl(request: Request) {
  const url = new URL(request.url);
  return new URL(`${url.pathname}${url.search}`, BACKEND_API_ORIGIN);
}

function isBodyAllowed(method: string) {
  return method !== "GET" && method !== "HEAD";
}

function proxyHeaders(request: Request) {
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");
  return headers;
}

async function proxyRequest(request: Request) {
  const target = buildTargetUrl(request);
  const init: RequestInit = {
    method: request.method,
    headers: proxyHeaders(request),
    redirect: "manual",
  };

  if (isBodyAllowed(request.method)) {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(target, init);
  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("transfer-encoding");

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const Route = createFileRoute("/api/v1/$")({
  server: {
    handlers: {
      GET: ({ request }) => proxyRequest(request),
      POST: ({ request }) => proxyRequest(request),
      PUT: ({ request }) => proxyRequest(request),
      PATCH: ({ request }) => proxyRequest(request),
      DELETE: ({ request }) => proxyRequest(request),
      OPTIONS: ({ request }) => proxyRequest(request),
    },
  },
});
