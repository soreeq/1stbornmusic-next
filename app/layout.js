import "./globals.css";

export const metadata = {
  title: "1stBornMusic – Beat Store",
  description: "Detroit Hip-Hop producer Cleveland L. Hurd — browse and license exclusive beats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}