import "./globals.css";

export const metadata = { title: "AI Test Builder", description: "Generate tests live with OpenAI" };

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
