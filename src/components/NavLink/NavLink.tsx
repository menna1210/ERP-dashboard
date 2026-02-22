import { Link } from "react-router-dom";

interface NavLinkProps {
  link: {
    path: string;
    title: string;
  };
}

export default function NavLink({ link }: NavLinkProps) {
  return (
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
  );
}
