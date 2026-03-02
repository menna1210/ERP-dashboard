import { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "../links/links";

export default function SideBar() {
  // !
const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  // ! 
 const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav
        style={{
          width: "250px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderRight: "1px solid #ccc",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Dashboard</h2>
        <br />

        {links.map((link) => {
          // !
          if (link.path === "/*") return null;

          const hasChildren = link.Children && link.Children.length > 0;

          return (
            <div
              key={link.id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {hasChildren ? (
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
              ) : (
                <Link
                  to={link.path}
                  style={{
                    textDecoration: "none",
                    color: "blue",
                    padding: "10px",
                    backgroundColor: "#e7e7e7",
                    borderRadius: "4px",
                  }}
                >
                  {link.title}
                </Link>
              )}

              {hasChildren && openMenuId === link.id && (
                <div
                  style={{
                    paddingLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginTop: "5px",
                  }}
                >
                  {link.Children.map((child) => (
                    <Link
                      key={child.id}
                      to={child.path}
                      style={{
                        textDecoration: "none",
                        color: "#555",
                        padding: "8px",
                        backgroundColor: "#fff",
                        border: "1px solid #eee",
                        fontSize: "14px",
                      }}
                    >
                      • {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
     </nav>
     
    </div>
  );
}
