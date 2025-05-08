async function loadScrollRegistry(url = '/scrolls/scroll_registry.json') {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.error("Failed to load scroll registry:", err);
    return null;
  }
}

function renderSpiralNav(registry, containerId = 'spiral-nav') {
  const container = document.getElementById(containerId);
  if (!container || !registry) return;

  Object.entries(registry).forEach(([rootKey, rootObj]) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'spiral-section';
    sectionDiv.innerHTML = `<h2>${rootKey}</h2>`;

    // Merge upper/lower into single timeline
    const branches = Object.entries(rootObj);
    branches.sort(([a], [b]) => a.localeCompare(b));

    branches.forEach(([caseKey, scrolls]) => {
      Object.entries(scrolls).forEach(([scrollId, data]) => {
        const link = document.createElement('a');
        link.href = `/${data.path}`;
        link.textContent = `[${data.waiicode}] ${data.title}`;
        link.className = 'spiral-link';
        sectionDiv.appendChild(link);
      });
    });

    container.appendChild(sectionDiv);
  });
}
