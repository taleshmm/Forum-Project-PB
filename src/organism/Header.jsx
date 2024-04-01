import MenuHeader from '../molecules/MenuHeader';

export default function Header() {
  return (
    <header className="h-16 bg-slate-800">
      <nav className="w-full h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <img
            src="src/assets/logo.png"
            alt="Logo site"
            className="h-12 w-12 rounded-full"
          />
          <h1 className="text-yellow-base text-2xl letter-theme">Ekros</h1>
        </div>
        <MenuHeader />
      </nav>
    </header>
  );
}
