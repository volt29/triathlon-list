const fields = ["name", "date", "url", "place", "drive_km", "price", "status", "distance", "source"];
const events = (window.__TRIATHLON_EVENTS || []).map((row) => Object.fromEntries(fields.map((field, index) => [field, row[index]])));
const searchInput = document.getElementById("searchInput");
const monthFilter = document.getElementById("monthFilter");
const distanceFilter = document.getElementById("distanceFilter");
const statusFilter = document.getElementById("statusFilter");
const resetButton = document.getElementById("resetButton");
const rows = document.getElementById("eventRows");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
const dateFormatter = new Intl.DateTimeFormat("pl-PL", { day: "2-digit", month: "long", year: "numeric" });
const statusLabels = { open: "Cena widoczna", sold: "Wyprzedane", unknown: "Brak jawnej ceny", past: "Po terminie" };

document.getElementById("totalCount").textContent = events.length;
document.getElementById("fullCount").textContent = events.filter((event) => event.distance === "Pełny").length;
document.getElementById("halfCount").textContent = events.filter((event) => event.distance === "1/2").length;
document.getElementById("countryCount").textContent = new Set(events.map((event) => event.place.split(",").at(-1).trim())).size;

function renderRows() {
  const query = searchInput.value.trim().toLowerCase();
  const month = monthFilter.value;
  const distance = distanceFilter.value;
  const status = statusFilter.value;
  const filtered = events.filter((event) => {
    const haystack = `${event.name} ${event.date} ${event.distance} ${event.place} ${event.drive_km || ""} km ${event.price} ${event.source}`.toLowerCase();
    return (!query || haystack.includes(query))
      && (month === "all" || event.date.slice(5, 7) === month)
      && (distance === "all" || event.distance === distance)
      && (status === "all" || event.status === status);
  });

  rows.replaceChildren();
  emptyState.hidden = filtered.length > 0;
  resultCount.textContent = `${filtered.length} z ${events.length} wydarzeń`;
  const fragment = document.createDocumentFragment();

  filtered.forEach((event) => {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    name.className = "event-name";
    name.textContent = event.name;
    const dateCell = document.createElement("td");
    dateCell.className = "date";
    dateCell.textContent = dateFormatter.format(new Date(`${event.date}T12:00:00`));
    const distanceCell = document.createElement("td");
    const distanceBadge = document.createElement("span");
    distanceBadge.className = `distance ${event.distance === "Pełny" ? "full" : "half"}`;
    distanceBadge.textContent = event.distance;
    distanceCell.append(distanceBadge);
    const link = document.createElement("td");
    const anchor = document.createElement("a");
    anchor.href = event.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.textContent = "Otwórz";
    link.append(anchor);
    const place = document.createElement("td");
    place.className = "place";
    place.textContent = event.place;
    const drive = document.createElement("td");
    drive.className = "drive-km";
    drive.textContent = event.drive_km ? `${event.drive_km.toLocaleString("pl-PL")} km` : "Brak danych";
    const price = document.createElement("td");
    price.className = "price-cell";
    const priceText = document.createElement("span");
    priceText.className = "price-text";
    priceText.textContent = event.price;
    const badge = document.createElement("span");
    badge.className = `badge ${event.status}`;
    badge.textContent = statusLabels[event.status] || event.status;
    price.append(priceText, badge);
    const source = document.createElement("td");
    source.className = "source";
    source.textContent = event.source;
    row.append(name, dateCell, distanceCell, link, place, drive, price, source);
    fragment.append(row);
  });

  rows.append(fragment);
}

searchInput.addEventListener("input", renderRows);
monthFilter.addEventListener("change", renderRows);
distanceFilter.addEventListener("change", renderRows);
statusFilter.addEventListener("change", renderRows);
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  monthFilter.value = "all";
  distanceFilter.value = "all";
  statusFilter.value = "all";
  renderRows();
  searchInput.focus();
});
renderRows();
