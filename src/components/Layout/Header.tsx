import React from "react";
import theme from "../../theme/theme";

interface HeaderProps {
  title: string;
  rightContent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, rightContent }) => {
  return (
    <div
      style={{
        backgroundColor: theme.colors.cleanPageWhite,
        padding: "1.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: `1px solid ${theme.colors.subtleGrey}`,
      }}
    >
      <h1
        style={{
          fontSize: theme.fontSizes.h1,
          fontWeight: theme.fontWeight.bold,
          color: theme.colors.adminInk,
        }}
      >
        {title}
      </h1>
      {rightContent && <div>{rightContent}</div>}
    </div>
  );
};

export default Header;
