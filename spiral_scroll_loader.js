// Load the registry
async function loadScrollRegistry(url = '/scrolls/scroll_registry.json') {
  try {
    const response = await fetch(url);
    const registry = await response.json();
    return registry;
  } catch (e) {
    console.error('Failed to load scroll registry:', e);
    return null;
  }
}

// Generate navigation links from registry
function renderSpiralNav(registry, containerId = 'spiral-nav') {
  const container = document.getElementById(containerId);
  if (!container || !registry) return;

  for (const section in registry) {
    const group = registry[section];
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'spiral-section';
    sectionDiv.innerHTML = `<h2>${section}</h2>`;

    for (const path in group) {
      const scrolls = group[path];
      for (const key in scrolls) {
        const data = scrolls[key];
        const link = document.createElement('a');
        link.href = `/${data.path}`;
        link.textContent = `${data.waiicode}: ${data.title}`;
        link.className = 'spiral-link';
        sectionDiv.appendChild(link);
      }
    }

    container.appendChild(sectionDiv);
  }
}
