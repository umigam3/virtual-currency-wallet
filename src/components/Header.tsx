import GitHub from "./ui/GitHub";

function Header() {
  return (
    <>
      <nav className="mb-10 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center justify-between max-w-5xl mx-auto h-16 px-6">
          <span
            className="text-lg md:text-2xl font-semibold uppercase tracking-wider
"
          >
            Virtual Currency Wallet
          </span>
          <a
            className="cursor-pointer"
            href="https://github.com/umigam3/virtual-currency-wallet"
            target="_blank"
          >
            <GitHub />
          </a>
        </div>
      </nav>
    </>
  );
}

export default Header;
