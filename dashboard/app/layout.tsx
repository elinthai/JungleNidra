import "./globals.css";

export const metadata = {
  title: "Jungle Nidra Dashboard",
  description: "Production system dashboard for Jungle Nidra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <span className="nav-brand">Jungle Nidra</span>
          <a href="/">Overview</a>
          <a href="/calendar">Calendar</a>
          <a href="/locations">Locations</a>
          <a href="/brand">Brand</a>
          <a href="/sop">SOP</a>
          <a href="/todo">Todo</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
