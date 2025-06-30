import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import theme from "../theme/theme";

interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div style={{ display: "flex", height: "100vh", background: theme.colors.adminCanvasGrey }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header title={title} />
        <main
          style={{
            padding: "2rem",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              textAlign: "center",
              backgroundColor: theme.colors.cleanPageWhite,
              padding: "3rem",
              borderRadius: theme.borderRadius.card,
              boxShadow: theme.boxShadow.subtle,
            }}
          >
            <h1
              style={{
                fontSize: theme.fontSizes.h1,
                fontWeight: theme.fontWeight.bold,
                color: theme.colors.adminInk,
                marginBottom: "1rem",
              }}
            >
              🚧 Coming Soon!
            </h1>
            <p style={{ fontSize: theme.fontSizes.body, color: theme.colors.lightGreyText }}>
              This section is under construction.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
