async function loadRoadmap() {
  const container = document.getElementById('roadmap-container');
  try {
    const response = await fetch('roadmap.json');
    const data = await response.json();

    Object.keys(data).forEach(timeframe => {
      const section = document.createElement('section');
      section.className = "bg-gray-800 rounded-2xl p-5 shadow-lg";

      const title = document.createElement('h2');
      title.className = "text-xl font-semibold mb-4 text-blue-400";
      title.textContent = timeframe;
      section.appendChild(title);

      data[timeframe].forEach(item => {
        const card = document.createElement('div');
        card.className = "mb-4 p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition";

        const statusColor = {
          "Completed": "text-green-400",
          "In Progress": "text-blue-400",
          "Planned": "text-yellow-400"
        }[item.status] || "text-gray-400";

        card.innerHTML = `
          <h3 class="text-lg font-bold">${item.title}</h3>
          <p class="text-sm text-gray-300 mb-2">${item.description}</p>
          <span class="${statusColor} text-sm font-semibold">${item.status}</span>
        `;
        section.appendChild(card);
      });

      container.appendChild(section);
    });

  } catch (error) {
    container.innerHTML = `<p class="text-red-500">Failed to load roadmap data.</p>`;
    console.error('Error loading roadmap:', error);
  }
}

loadRoadmap();
