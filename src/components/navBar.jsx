import Link from "next/link";

const NavBar = () => {
  return (
    <div className="p-6 bg-slate-700">
      <nav className="flex justify-between ">
        <div className="text-3xl font-bold">
          <h1>Proyecto CRUD</h1>
        </div>
        <div className="space-x-5 pr-32 text-xl font-semibold">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/new" className="hover:underline">
            Create
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
