import Link from "next/link";

export default function Home() {
  return (
    <div className="main">
      HOME
      <Link href="/abc">ABC</Link>
      <div className="w-full h-screen border-2"></div>
      <div className="w-full h-screen border-2"></div>
      <div className="w-full h-screen border-2"></div>
      <div className="w-full h-screen border-2"></div>
    </div>
  );
}
