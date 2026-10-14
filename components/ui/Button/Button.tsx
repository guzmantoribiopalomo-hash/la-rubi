import Link from "next/link";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function Button({ children, href }: ButtonProps) {
  return (
    <Link href={href} className={styles.button}>
      {children}
    </Link>
  );
}