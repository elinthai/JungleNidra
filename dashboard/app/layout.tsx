import "./globals.css";
import Providers from "./providers";
import SignOutButton from "./SignOutButton";
import ChannelSwitcher from "./ChannelSwitcher";
import { getActiveChannel } from "../lib/activeChannel";

export const metadata = {
  title: "Jungle Nidra Dashboard",
  description: "Production workbench for Jungle Nidra",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const activeChannel = getActiveChannel();
  return (
    <html lang="en">
      <body>
        <Providers>
          <nav className="nav">
            <span className="nav-brand">Jungle Nidra</span>
            <a href="/">Overview</a>
            <a href="/projects">Projects</a>
            <a href="/calendar">Calendar</a>
            <a href="/locations">Locations</a>
            <a href="/brand">Brand</a>
            <a href="/sop">SOP</a>
            <a href="/todo">Todo</a>
            <a href="/changelog">Changelog</a>
            <span style={{ flex: 1 }} />
            <ChannelSwitcher activeChannel={activeChannel} />
            <SignOutButton />
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
