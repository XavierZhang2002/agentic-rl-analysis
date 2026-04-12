import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: "base",
  themeVariables: {
    primaryColor: "#eef0fb",
    primaryTextColor: "#303680",
    primaryBorderColor: "#9ba3d6",
    lineColor: "#9ba3d6",
    secondaryColor: "#f8f8fc",
    secondaryBorderColor: "#d8dbe8",
    secondaryTextColor: "#303680",
    tertiaryColor: "#ffffff",
    tertiaryBorderColor: "#d8dbe8",
    tertiaryTextColor: "#303680",
    clusterBkg: "#ffffff",
    clusterBorder: "#d8dbe8",
    edgeLabelBackground: "#ffffff",
    noteBkgColor: "#f8f8fc",
    noteTextColor: "#303680",
    noteBorderColor: "#9ba3d6",
    fontFamily: "Noto Sans SC, -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "13px",
  },
});

async function renderMermaidCustom() {
  const elements = document.querySelectorAll(".mermaid-custom");
  if (elements.length === 0) return;

  for (const el of elements) {
    if (el.dataset.processed) continue;
    el.dataset.processed = "true";

    const code = el.textContent.trim();
    const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;

    try {
      const { svg } = await mermaid.render(id, code);
      el.innerHTML = svg;
      el.style.textAlign = "center";
    } catch (err) {
      console.error("Mermaid render error:", err);
    }
  }
}

if (typeof document$ !== "undefined") {
  document$.subscribe(() => renderMermaidCustom());
} else {
  document.addEventListener("DOMContentLoaded", renderMermaidCustom);
}
