import Image from "next/image";
import Logo from "../../../public/images/core/logo.png";

export default function Maintenance() {
  return (
    <div
      style={{
        backgroundColor: "#e5e4de",
        color: "#42464a",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Need inline style for keyframes
        dangerouslySetInnerHTML={{
          __html: `
        #bouncing-logo {
          animation: bounce-x 13s linear infinite alternate, 
                     bounce-y 7s linear infinite alternate;
        }

        @keyframes bounce-x {
          from { left: 0; }
          to { left: calc(100% - 150px); }
        }

        @keyframes bounce-y {
          from { top: 0; }
          to { top: calc(100% - 150px); }
        }
      `,
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 50,
        }}
      >
        <div
          id="bouncing-logo"
          style={{
            position: "absolute",
            height: "150px",
            width: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={Logo}
            alt="VauntVault Logo"
            width={150}
            height={150}
            style={{
              height: "100%",
              width: "auto",
              borderRadius: "1rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #42464a",
            }}
          />
        </div>
      </div>

      <div
        style={{
          maxWidth: "28rem",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            letterSpacing: "-0.025em",
            fontFamily: "'Cinzel', 'Playfair Display', 'Georgia', serif",
          }}
        >
          Under Maintenance
        </h1>
        <p
          style={{
            opacity: 0.7,
            fontSize: "1.125rem",
            lineHeight: 1.625,
            marginBottom: "2rem",
          }}
        >
          We're currently performing some scheduled maintenance to improve our
          luxury reselling experience. We'll be back shortly!
        </p>
        <div
          style={{
            opacity: 0.5,
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          &copy; {new Date().getFullYear()} VauntVault.
        </div>
      </div>
    </div>
  );
}
