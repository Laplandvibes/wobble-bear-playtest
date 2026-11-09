(() => {
  const status = document.getElementById("status");
  if (!status) return;
  const progress = document.getElementById("status-progress");
  const notice = document.getElementById("status-notice");
  let finnish = false;
  try { finnish = localStorage.getItem("wobble.language") === "fi"; } catch {}
  const label = document.createElement("p");
  status.insertBefore(label, progress);
  const retry = document.createElement("a");
  retry.href = location.href;
  retry.textContent = finnish ? "Yritä uudelleen" : "Try again";
  status.append(retry);
  function update() {
    const failed = Boolean(notice.textContent.trim());
    retry.hidden = !failed;
    label.hidden = failed;
    if (failed) return;
    const percent = progress.hasAttribute("value") ? Math.round(100 * progress.position) : 0;
    const text = percent >= 100
      ? (finnish ? "Avataan metsää…" : "Opening the forest…")
      : (finnish ? "Ladataan peliä" : "Loading game") + (percent > 0 ? " · " + percent + "%" : "…");
    label.textContent = text;
    progress.setAttribute("aria-label", text);
  }
  const observer = new MutationObserver(update);
  observer.observe(progress, {attributes: true, attributeFilter: ["value", "max"]});
  observer.observe(notice, {childList: true, subtree: true, characterData: true});
  update();
})();
