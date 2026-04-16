"use client";

import { useEffect, useMemo, useState } from "react";

type DownloadState = "idle" | "token" | "downloading" | "done" | "error";

type ModuleCard = {
  id: string;
  title: string;
  version: string;
  tags: string[];
  filePath: string;
};

const MODULES: ModuleCard[] = [
  {
    id: "kernel-suite",
    title: "Kernel Suite",
    version: "v2.8.4",
    tags: ["Kernel", "Core"],
    filePath: "kernel-suite-v2.8.4.zip"
  },
  {
    id: "injector-pro",
    title: "Injector Pro",
    version: "v1.6.1",
    tags: ["Injector", "Secure"],
    filePath: "injector-pro-v1.6.1.zip"
  },
  {
    id: "visor-hub",
    title: "Visor Hub",
    version: "v3.1.0",
    tags: ["Loader", "Monitor"],
    filePath: "visor-hub-v3.1.0.zip"
  }
];

export default function DashboardClient() {
  const [telegramReady, setTelegramReady] = useState(false);
  const [boundReady, setBoundReady] = useState(false);
  const [loginToken, setLoginToken] = useState("");
  const [botLink, setBotLink] = useState("");
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const activeText = useMemo(() => {
    if (downloadState === "token") return "Generating Secure Token...";
    if (downloadState === "downloading") return "Downloading...";
    if (downloadState === "done") return "Download started";
    if (downloadState === "error") return "Failed. Try again";
    return "Download Secure Build";
  }, [downloadState]);

  const onTelegramLogin = async () => {
    setErrorMessage("");
    setTelegramReady(false);
    setBoundReady(false);

    const response = await fetch("/api/auth/token/create", { method: "POST" });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setErrorMessage(data.error ?? "Token generation failed");
      return;
    }

    const data = (await response.json()) as { token: string; botLink: string };
    setLoginToken(data.token);
    setBotLink(data.botLink);
  };

  useEffect(() => {
    if (!loginToken || telegramReady) {
      return;
    }

    const timer = setInterval(async () => {
      const response = await fetch(`/api/auth/token/status?token=${encodeURIComponent(loginToken)}`);
      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { status: string };
      if (data.status === "confirmed") {
        setTelegramReady(true);
        clearInterval(timer);
      }

      if (data.status === "expired") {
        setErrorMessage("Token expired. Generate a new one.");
        setLoginToken("");
        setBotLink("");
        clearInterval(timer);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [loginToken, telegramReady]);

  const onBindAccount = async () => {
    setErrorMessage("");
    const response = await fetch("/api/auth/bind", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setErrorMessage(data.error ?? "Bind account failed");
      return;
    }

    setBoundReady(true);
  };

  const onDownload = async (moduleCard: ModuleCard) => {
    setActiveModuleId(moduleCard.id);
    setErrorMessage("");
    setDownloadState("token");

    const response = await fetch(`/api/download?file=${encodeURIComponent(moduleCard.filePath)}`);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setErrorMessage(data.error ?? "Signed URL generation failed");
      setDownloadState("error");
      return;
    }

    const data = (await response.json()) as { signedUrl: string };
    setDownloadState("downloading");
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setDownloadState("done");
    }, 900);
  };

  return (
    <main className="dashboard-shell">
      <aside className="glass-panel sidebar">
        <div className="socials">
          {["TikTok", "YouTube", "Telegram"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <nav className="nav-stack">
          <button className="capsule active">Library</button>
          <button className="capsule">News</button>
          <button className="capsule">Profile</button>
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">NK</div>
          <button className="logout-btn">Logout</button>
        </div>
      </aside>

      <section className="library-grid">
        {MODULES.map((moduleCard) => {
          const isActive = activeModuleId === moduleCard.id;
          const canDownload = telegramReady && boundReady;

          return (
            <article key={moduleCard.id} className="glass-panel software-card">
              <div className="card-banner" />
              <div className="card-tags">
                {moduleCard.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3>{moduleCard.title}</h3>
              <p>{moduleCard.version}</p>

              {isActive && downloadState !== "idle" ? (
                <div className={`download-state ${downloadState}`}>
                  <span className="lock">lock</span>
                  <span>{activeText}</span>
                </div>
              ) : (
                <button
                  className="download-btn"
                  disabled={!canDownload}
                  onClick={() => onDownload(moduleCard)}
                >
                  {canDownload ? "Request Secure Download" : "Auth Required"}
                </button>
              )}
            </article>
          );
        })}
      </section>

      <section className="glass-panel auth-modal">
        <h2>Secure Authentication</h2>
        <button className="telegram-btn" onClick={onTelegramLogin}>
          Generate Login Token
        </button>
        {botLink ? (
          <a className="token-link" href={botLink} target="_blank" rel="noreferrer">
            Open bot with token
          </a>
        ) : null}
        <div className={`step-line ${telegramReady ? "active" : ""}`} />

        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Create Username"
          className="glass-input"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="glass-input"
        />
        <button className="bind-btn" disabled={!telegramReady} onClick={onBindAccount}>
          {boundReady ? "Bound Successfully" : "Bind Account"}
        </button>

        {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      </section>
    </main>
  );
}
