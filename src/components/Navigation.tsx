type NavigationProps = {
    current: "shop" | "audit" | "merchant";
  };
  
  export default function Navigation({ current }: NavigationProps) {
    const links = {
      shop: [
        { href: "/audit", label: "Move to Audit Trail →" },
        { href: "/merchant", label: "Move to Merchant Dashboard →" },
      ],
      audit: [
        { href: "/", label: "← Move to Shop" },
        { href: "/merchant", label: "Move to Merchant Dashboard →" },
      ],
      merchant: [
        { href: "/", label: "← Move to Shop" },
        { href: "/audit", label: "Move to Audit Trail →" },
      ],
    };
  
    return (
      <nav className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white px-6 py-4">
        {links[current].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            {link.label}
          </a>
        ))}
      </nav>
    );
  }