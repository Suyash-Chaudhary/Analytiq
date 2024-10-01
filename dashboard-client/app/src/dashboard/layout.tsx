export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="border-2 border-black">
      Dahsboard layout:
      <div>{children}</div>
    </div>
  );
}
