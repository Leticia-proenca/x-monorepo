import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

const TAB_BAR_WEB_STYLES = `
  html,
  body,
  input,
  textarea,
  button,
  select {
    font-family: 'Space Grotesk', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    background-color: #F4F5F7;
  }

  @media (prefers-color-scheme: dark) {
    html,
    body {
      background-color: #151718;
    }
  }

  #app-tab-bar {
    width: 100% !important;
    align-self: stretch !important;
    flex-shrink: 0 !important;
    box-sizing: border-box !important;
  }

  [role="tab"] {
    overflow: visible !important;
    min-height: 48px !important;
    justify-content: center !important;
    align-items: center !important;
    padding-top: 6px !important;
    padding-bottom: 4px !important;
  }

  [role="tab"] * {
    overflow: visible !important;
    line-height: 1.3 !important;
  }

  [role="dialog"] {
    position: fixed !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    max-height: 100% !important;
  }
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        <title>Triagem X</title>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iNTAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iNTAiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl83MzRfNTMpIi8+CjxwYXRoIGQ9Ik0yMDAuNjM2IDMzM0MxOTMuNDUgMzMzIDE4Ny41ODMgMzMwLjggMTgzLjAzNiAzMjYuNEMxNzguNjM2IDMyMS44NTMgMTc2LjQzNiAzMTUuODQgMTc2LjQzNiAzMDguMzZWMjQ2Ljc2SDE0OS4xNTZWMjIzLjg4SDE3Ni40MzZWMTkwSDIwNC4xNTZWMjIzLjg4SDIzNC4wNzZWMjQ2Ljc2SDIwNC4xNTZWMzAzLjUyQzIwNC4xNTYgMzA3LjkyIDIwNi4yMSAzMTAuMTIgMjEwLjMxNiAzMTAuMTJIMjMxLjQzNlYzMzNIMjAwLjYzNlpNMjQ1LjA4OCAzMzNMMjg0LjY4OCAyNzhMMjQ1LjUyOCAyMjMuODhIMjc3LjY0OEwzMDIuNTA4IDI2MC4xOEgzMDYuNDY4TDMzMS4zMjggMjIzLjg4SDM2My40NDhMMzI0LjI4OCAyNzhMMzYzLjg4OCAzMzNIMzMxLjMyOEwzMDYuNDY4IDI5Ni4yNkgzMDIuNTA4TDI3Ny42NDggMzMzSDI0NS4wODhaIiBmaWxsPSJ3aGl0ZSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzczNF81MyIgeDE9IjUxMiIgeTE9IjI1NiIgeDI9IjAiIHkyPSIyNTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzFGMjczMiIvPgo8c3RvcCBvZmZzZXQ9IjAuNSIgc3RvcC1jb2xvcj0iIzFDMUMxQyIvPgo8c3RvcCBvZmZzZXQ9IjAuOTcxMTU0IiBzdG9wLWNvbG9yPSIjMUMxQzFDIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: TAB_BAR_WEB_STYLES }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
