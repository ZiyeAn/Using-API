document.addEventListener('DOMContentLoaded', () => {
    const url = `https://east-side-spots-api.onrender.com`;
    const shopList = document.getElementById("shop-list");
    const loadingBanner = document.getElementById("loading-banner");

    async function filterShops() {
        // Get selected category from radio buttons
        const category = document.querySelector('input[name="category"]:checked').value;
        shopList.innerHTML = "";  // Clear previous results
        loadingBanner.style.display = "block";  // Show loading banner

        try {
            // Fetch shops based on category
            const response = await fetch(`${url}/spot?category=${category}`);
            const shopNames = await response.json();
            console.log(shopNames)
            // Fetch details for each shop and create cards
            for (const shopName of shopNames) {
                const selectedShopsInfo = await fetch(`${url}/name/:${shopName}`);
                const shopInfo = await selectedShopsInfo.json();

                // Create card for each shop
                const shopCard = document.createElement("div");
                shopCard.classList.add("shop-card");
                
                shopCard.innerHTML = `
                    <h3>${shopInfo.name}</h3>
                    <p><strong>Description:</strong> ${shopInfo.desc}</p>
                    <p><strong>Rating:</strong> ${shopInfo.rating}</p>
                    <p><strong>Address:</strong> ${shopInfo.address}</p>
                `;
                
                // Append card to shop list container
                shopList.appendChild(shopCard);
            }
        } catch (error) {
            console.error("Error fetching shops:", error);
        } finally {
            loadingBanner.style.display = "none";  // Hide loading banner after loading
        }
    }

    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener("change", filterShops);
    });

    // Initial load
    filterShops();
});