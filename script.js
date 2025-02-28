function updateTimeframes() {
    let midpoint = document.getElementById("midpoint-select").value;
    let ltf, htf;

    // Correct LTF & HTF Assignments
    if (midpoint === "3M") { ltf = "1M"; htf = "15M"; }
    else if (midpoint === "5M") { ltf = "2M"; htf = "30M"; }
    else if (midpoint === "15M") { ltf = "3M"; htf = "1H"; }
    else if (midpoint === "30M") { ltf = "5M"; htf = "2H"; }
    else if (midpoint === "1H") { ltf = "15M"; htf = "4H"; }

    // Update UI to show selected LTF & HTF
    document.getElementById("ltf-display").innerText = `LTF: ${ltf}`;
    document.getElementById("htf-display").innerText = `HTF: ${htf}`;
}

// Attach event listener to update LTF/HTF when midpoint changes
document.getElementById("midpoint-select").addEventListener("change", updateTimeframes);

// ✅ Add event listener for "Calculate Hydro" button
document.getElementById("calculate-button").addEventListener("click", calculateHydro);

function calculateHydro() {
    let hydroScore = 0;

    // Get selected midpoint indicators
    let midpointStrength = 0;
    document.querySelectorAll(".midpoint-check:checked").forEach(el => {
        midpointStrength += parseFloat(el.value) || 0; // ✅ Prevent NaN errors
    });

    // Get selected LTF indicators
    let ltfStrength = 0;
    document.querySelectorAll(".ltf-check:checked").forEach(el => {
        ltfStrength += parseFloat(el.value) || 0;
    });

    // Get selected HTF indicators
    let htfStrength = 0;
    document.querySelectorAll(".htf-check:checked").forEach(el => {
        htfStrength += parseFloat(el.value) || 0;
    });

    // Check if Sniper Entry is enabled
    let sniperMode = document.getElementById("sniper-entry").checked;
    
    // Define weighting based on Sniper Entry toggle
    let ltfWeight = sniperMode ? 0.45 : 0.2857;
    let htfWeight = sniperMode ? 0.40 : 0.5714;
    let midpointWeight = 0.1429;

    // Compute Hydro Score using weights
    hydroScore = (midpointStrength * midpointWeight) + (ltfStrength * ltfWeight) + (htfStrength * htfWeight);

    // ✅ Ensure elements exist before modifying them
    if (document.getElementById("hydro-score")) {
        document.getElementById("hydro-score").innerText = hydroScore.toFixed(1);
    }

    let rating = hydroScore >= 90 ? "🔥 Ultra Strong"
        : hydroScore >= 75 ? "✅ Strong"
        : hydroScore >= 50 ? "⚠️ Moderate"
        : hydroScore >= 30 ? "❓ Low"
        : "🚫 Weak";

    if (document.getElementById("strength-rating")) {
        document.getElementById("strength-rating").innerText = `Strength Rating: ${rating}`;
    }
}