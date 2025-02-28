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

document.addEventListener("DOMContentLoaded", function () {
    // ✅ Attach event listener for "Calculate Hydro" button
    document.getElementById("calculate-button").addEventListener("click", calculateHydro);

    // ✅ Attach event listener to update LTF/HTF when midpoint changes
    document.getElementById("midpoint-select").addEventListener("change", updateTimeframes);

    updateTimeframes(); // Ensure timeframes are set correctly on load
});

function updateTimeframes() {
    let midpoint = document.getElementById("midpoint-select").value;
    let ltf, htf;

    if (midpoint === "3M") { ltf = "1M"; htf = "15M"; }
    else if (midpoint === "5M") { ltf = "2M"; htf = "30M"; }
    else if (midpoint === "15M") { ltf = "3M"; htf = "1H"; }
    else if (midpoint === "30M") { ltf = "5M"; htf = "2H"; }
    else if (midpoint === "1H") { ltf = "15M"; htf = "4H"; }

    document.getElementById("ltf-display").innerText = `LTF: ${ltf}`;
    document.getElementById("htf-display").innerText = `HTF: ${htf}`;
}

function calculateHydro() {
    let hydroScore = 0;

    // ✅ Get selected midpoint timeframe
    let midpoint = document.getElementById("midpoint-select").value;

    // ✅ Base midpoint weight
    let midpointWeight = 0.1429;
    if (["1M", "2M", "3M", "5M"].includes(midpoint)) {
        midpointWeight += 0.0429; // Flat +30% boost
    } else if (midpoint === "15M") {
        midpointWeight += 0.032; // Flat +22.5% boost
    }

    // ✅ **Get Selected Entry Condition Values for Midpoint**
    let entryCondition = document.getElementById("premium-discount-select-midpoint").value;
    let entryBoost = entryCondition === "1" ? 8 : entryCondition === "2" ? 6 : 7; // Premium, Discount, FVG

    // ✅ **Get Selected Trend Condition for Midpoint**
    let dualCloudSetup = document.getElementById("dual-cloud-select-midpoint").value;
    let trendBoost = dualCloudSetup === "1" ? 10 : dualCloudSetup === "2" ? 7 : dualCloudSetup === "3" ? 5 : 0;

    // ✅ **Get Volume Surge for Midpoint**
    let volumeBoost = document.getElementById("volume-surge-midpoint").checked ? 7 : 0;

    // ✅ **Get Divergence for Midpoint**
    let divergence = document.getElementById("divergence-select-midpoint").value;
    let divergenceBoost = divergence === "favorable" ? 6 : -4;

    // ✅ Calculate midpoint strength
    let midpointStrength = entryBoost + trendBoost + volumeBoost + divergenceBoost;

    // ✅ Get Selected LTF Indicators
    let ltfStrength = 0;
    document.querySelectorAll(".ltf-check:checked").forEach(el => {
        ltfStrength += parseFloat(el.value) || 0;
    });

    // ✅ Get Selected HTF Indicators
    let htfStrength = 0;
    document.querySelectorAll(".htf-check:checked").forEach(el => {
        htfStrength += parseFloat(el.value) || 0;
    });

    // ✅ Check if Sniper Entry is enabled
    let sniperMode = document.getElementById("sniper-entry").checked;
    
    // ✅ Define weighting based on Sniper Entry toggle
    let ltfWeight = sniperMode ? 0.45 : 0.2857;
    let htfWeight = sniperMode ? 0.40 : 0.5714;

    // ✅ Compute Hydro Score using adjusted weights
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