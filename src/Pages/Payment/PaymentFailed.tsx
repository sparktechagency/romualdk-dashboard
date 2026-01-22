import React, { useEffect, useState } from "react";

const PaymentFailed: React.FC = () => {
  const [countdown, setCountdown] = useState(5);

  // Deep link & fallbacks (replace placeholders)
  const deepLink = "goconnectepaymentfailed://payment/success";
  const iosFallback = "https://apps.apple.com/...";
  const androidFallback = "https://play.google.com/store/apps/details?id=your.app.id";
  const desktopFallback = "https://yourwebsite.com/download-app";

  // Device detection
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isMobile = isIOS || isAndroid;

  const fallbackURL = isIOS ? iosFallback : isAndroid ? androidFallback : desktopFallback;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isMobile) {
            attemptOpenApp();
          } else {
            window.location.href = fallbackURL;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMobile, fallbackURL]);

  const attemptOpenApp = () => {
    const start = Date.now();
    window.location.href = deepLink;

    setTimeout(() => {
      if (Date.now() - start < 2000) {
        window.location.href = fallbackURL;
      }
    }, 1200);
  };

  // ── Styles (exactly as you provided) ─────────────────────────────────
  const styles : Record<string, React.CSSProperties> = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f8ff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      margin: 0,
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    success: {
      fontSize: "1.5rem",
      color: "#d61515",           // red for failure
      marginBottom: "1rem",
    },
    button: {
      fontSize: "1rem",
      color: "#ffffff",
      backgroundColor: "#d61515", // red button
      border: "none",
      borderRadius: "8px",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      marginBottom: "1rem",
    },
    link: {
      fontSize: "1rem",
      color: "#007bff",
      textDecoration: "none",
      display: "inline-block",
      marginTop: "0.5rem",
    },
    timer: {
      marginTop: "0.5rem",
      fontSize: "0.9rem",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.success}>❌ Payment Failed!</div>

        <button onClick={isMobile ? attemptOpenApp : () => window.location.href = fallbackURL} style={styles.button}>
            Open in App
        </button>

        {isMobile && (
          <a href={fallbackURL} style={styles.link}>
            Don't have the app? Download here
          </a>
        )}

        <div style={styles.timer}>
          Redirecting in <span>{countdown}</span> seconds...
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;