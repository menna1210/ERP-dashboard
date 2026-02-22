interface NavItemProps {
  link: {
    id: number;
    title: string;
  };
  toggleMenu: (id: number) => void;
  openMenuId: number;
}

export default function NavItem({
  link,
  openMenuId,
  toggleMenu,
}: NavItemProps) {
  return (
    <div
      onClick={() => toggleMenu(link.id)}
      style={{
        cursor: "pointer",
        padding: "10px",
        backgroundColor: "#ddd",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {link.title}
      <span>{openMenuId === link.id ? "▲" : "▼"}</span>
    </div>
  );
}
