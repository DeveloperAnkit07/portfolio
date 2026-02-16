const apiKey = "f0aeff7b452e5975ba468f1d8a1c905c";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

// ===== Image Modal Functionality - NEW =====
const modal = document.getElementById("imageModal");
const previewWrapper = document.getElementById("previewWrapper");
const modalImage = document.getElementById("modalImage");
const closeModal = document.querySelector(".modal-close");

// Open modal when clicking preview image
previewWrapper.addEventListener("click", () => {
  modal.style.display = "block";
  modalImage.src = "weather-preview.png";
  document.body.style.overflow = "hidden";
});

// Close modal when clicking X button
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ===== Weather API Functionality =====
async function getWeather(city) {
  try {
    // Show loading state
    weatherInfo.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
        <div class="loading"></div>
        <p>Loading weather data...</p>
      </div>
    `;

    // Use direct API call first
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${apiKey}`;
    
    let response = await fetch(apiUrl);
    
    // If CORS blocked, use backup proxy
    if (!response.ok) {
      console.warn("Direct fetch failed, trying proxy...");
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
      response = await fetch(proxyUrl);
    }
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    console.log("Weather data:", data);
    
    // Check if city was found
    if (!data || data.cod === "404" || !data.main) {
      weatherInfo.innerHTML = `
        <h2>City not found 😞</h2>
        <p>Please check the spelling and try again</p>
      `;
      return;
    }
    
    // Get weather icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Render weather data
    weatherInfo.innerHTML = `
      <img src="${iconUrl}" alt="${data.weather[0].description}" style="width: 70px; height: 70px; margin-bottom: 8px;">
      <h2>${data.name}, ${data.sys?.country || "N/A"}</h2>
      <p>🌡 Temperature: <strong>${Math.round(data.main.temp)}°C</strong></p>
      <p>🌥 Condition: <strong>${data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</strong></p>
      <p>💧 Humidity: <strong>${data.main.humidity}%</strong></p>
      <p>🌬 Wind Speed: <strong>${data.wind.speed} m/s</strong></p>
    `;
  } catch (error) {
    console.error("Error fetching weather:", error);
    weatherInfo.innerHTML = `
      <h2>Error fetching weather data ❌</h2>
      <p style="font-size:14px; margin-top: 8px;">
        ${error.message || "Please check your connection and try again"}
      </p>
    `;
  }
}

// Search button click event
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    weatherInfo.innerHTML = `
      <h2>Please enter a city name 🔍</h2>
      <p>Type a city name and click Search</p>
    `;
  }
});

// Allow Enter key to search
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
