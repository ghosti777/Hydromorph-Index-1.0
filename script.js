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

function getPyroScore() {
    return parseFloat(document.getElementById("pyro-score").value) || 0;
}

function calculateHydro() {
    let hydroScore = 0;

    // Get selected midpoint timeframe
    let midpoint = document.getElementById("midpoint-select").value;

    // Base midpoint weight
    let midpointWeight = 0.1429;

    // ✅ Dynamic Midpoint Boost Adjustments
    if (["1M", "2M", "3M", "5M"].includes(midpoint)) {
        midpointWeight += 0.0429; // Flat +30% boost
    } else if (midpoint === "15M") {
        midpointWeight += 0.032; // Flat +22.5% boost
    } 
    // ✅ 30M remains unchanged

    // ✅ **Indicator Scoring**
    function getIndicatorScore(section) {
        let score = 0;

        // **Dual Cloud Setup**
        let dualCloudValue = document.getElementById(`dual-cloud-select-${section}`).value;
        let dualCloudScore = { "1": 10, "2": 7, "3": 4, "4": -5 };
        score += dualCloudScore[dualCloudValue] || 0;

        // **Entry Conditions**
        let entryValue = document.getElementById(`premium-discount-select-${section}`).value;
        let entryScore = { "1": -5, "2": 6, "3": 4 };
        score += entryScore[entryValue] || 0;

        // **Volume Surge**
        let volumeSurge = document.getElementById(`volume-surge-${section}`).checked ? 7 : 0;
        score += volumeSurge;

        // **Divergence**
        let divergenceValue = document.getElementById(`divergence-select-${section}`).value;
        let divergenceScore = { "favorable": 6, "unfavorable": -4 };
        score += divergenceScore[divergenceValue] || 0;

        return score;
    }

    // ✅ **Calculate Scores for Each Section**
    let ltfStrength = getIndicatorScore("ltf");
    let midpointStrength = getIndicatorScore("midpoint");
    let htfStrength = getIndicatorScore("htf");

    // ✅ **New Finalized Weights**
    let ltfWeight = 0.40;
    let htfWeight = 0.45;

    hydroScore = ((midpointStrength * midpointWeight) + (ltfStrength * ltfWeight) + (htfStrength * htfWeight)) * 3.33;
    
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