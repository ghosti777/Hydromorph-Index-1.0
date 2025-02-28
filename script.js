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

function calculateHydro() {
    let hydroScore = 0;
    
    // Check if Sniper Entry is enabled
    let sniperMode = document.getElementById("sniper-entry").checked;
    
    // Define weighting based on Sniper Entry toggle
    let ltfWeight = sniperMode ? 0.45 : 0.2857;
    let htfWeight = sniperMode ? 0.40 : 0.5714;
    let midpointWeight = 0.1429; // Locked-in weight for midpoint

    // Placeholder values for timeframes (we'll eventually input real values here)
    let midpointStrength = 100; // This is a placeholder - will later be calculated dynamically
    let ltfStrength = 90; // Placeholder for now
    let htfStrength = 110; // Placeholder for now

    // Compute Hydro Score using weights
    hydroScore = (midpointStrength * midpointWeight) + (ltfStrength * ltfWeight) + (htfStrength * htfWeight);

    // Display Hydro Score
    document.getElementById("hydro-score").innerText = hydroScore.toFixed(1);

    // Assign Strength Rating
    let rating = hydroScore >= 90 ? "🔥 Ultra Strong"
        : hydroScore >= 75 ? "✅ Strong"
        : hydroScore >= 50 ? "⚠️ Moderate"
        : hydroScore >= 30 ? "❓ Low"
        : "🚫 Weak";

    document.getElementById("strength-rating").innerText = `Strength Rating: ${rating}`;
}