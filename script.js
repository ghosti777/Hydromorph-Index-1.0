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
    console.log("Calculating Hydro...");

    let midpoint = document.getElementById("midpoint-select").value;

    let midpointWeight = 0.1429;
    if (["1M", "2M", "3M", "5M"].includes(midpoint)) {
        midpointWeight += 0.0429;
    } else if (midpoint === "15M") {
        midpointWeight += 0.032;
    }

    function getIndicatorScore(section) {
        let score = 0;

        let dualCloudValue = document.getElementById(`dual-cloud-select-${section}`).value;
        let dualCloudScore = { "1": 10, "2": 7, "3": 4, "4": -5 };
        score += dualCloudScore[dualCloudValue] || 0;

        let entryValue = document.getElementById(`premium-discount-select-${section}`).value;
        let entryScore = { "1": -5, "2": 6, "3": 4 };
        score += entryScore[entryValue] || 0;

        let volumeSurge = document.getElementById(`volume-surge-${section}`).checked ? 7 : 0;
        score += volumeSurge;

        let divergenceValue = document.getElementById(`divergence-select-${section}`).value;
        let divergenceScore = { "favorable": 6, "unfavorable": -4 };
        score += divergenceScore[divergenceValue] || 0;

        return score;
    }

    let ltfStrength = getIndicatorScore("ltf");
    let midpointStrength = getIndicatorScore("midpoint");
    let htfStrength = getIndicatorScore("htf");

    let ltfWeight = 0.40;
    let htfWeight = 0.45;

    hydroScore = ((midpointStrength * midpointWeight) + (ltfStrength * ltfWeight) + (htfStrength * htfWeight)) * 3.33;

    console.log("Hydro Score Calculated:", hydroScore);

    let hydroElement = document.getElementById("hydro-score");
    if (hydroElement) {
        hydroElement.innerText = hydroScore.toFixed(1);
        console.log("Hydro Score Updated in UI");

        // ✅ Immediately Calculate Morphic Score
        calculateMorphicScore();
    } else {
        console.error("Hydro Score element NOT found.");
    }
}

function calculateMorphicScore() {
    console.log("Calculating Morphic Score...");

    let pyroInput = document.getElementById("pyro-score");
    let pyroScore = pyroInput ? parseFloat(pyroInput.value) || 0 : 0;

    let hydroElement = document.getElementById("hydro-score");
    let hydroScore = hydroElement ? parseFloat(hydroElement.textContent) || 0 : 0;

    console.log("Pyro Score:", pyroScore);
    console.log("Hydro Score:", hydroScore);

    let morphicScore = (pyroScore * 0.65) + (hydroScore * 0.35);
    morphicScore = morphicScore.toFixed(2);

    let morphicElement = document.getElementById("morphic-score");
    if (morphicElement) {
        morphicElement.textContent = morphicScore;
        console.log("Morphic Score Updated:", morphicScore);

        // ✅ **Update Morphic Strength Analysis**
        updateMorphicAnalysis(morphicScore);
    } else {
        console.error("Morphic Score element NOT found.");
    }

    // ✅ **New: Update Strength Rating**
    updateStrengthRating(morphicScore);
}

function updateMorphicAnalysis(morphicScore) {
    console.log("Updating Morphic Analysis...");
    let analysisText = "";

    if (morphicScore >= 95) {
        analysisText = "🔥 Ultra-Morphic Supernova 🔥 – Insanely high probability. These setups are almost unstoppable.";
    } else if (morphicScore >= 85) {
        analysisText = "⚡ Hyper-Morphic ⚡️ - Strongest setups with rare confluence. High probability.";
    } else if (morphicScore >= 70) {
        analysisText = "✅ Morphic Prime ✅ - Excellent confluence. Strong signal with conviction.";
    } else if (morphicScore >= 55) {
        analysisText = "⚠️ Stable Morphic ⚠️– Good alignment, but watch for additional confirmation.";
    } else if (morphicScore >= 40) {
        analysisText = "🚨 Morphic Flux 🚨 – Neutral to weak alignment. Use caution.";
    } else {
        analysisText = "🚫 Morphic Dissonance 🚫 – Weak signal. Risky and likely not worth taking.";
    }

    let analysisElement = document.getElementById("morphic-analysis");
    if (analysisElement) {
    analysisElement.innerHTML = `<em>${analysisText}</em>`;
        console.log("Morphic Analysis Updated:", analysisText);
    } else {
        console.error("Morphic Analysis element NOT found.");
    }
}
// 🔥 Auto-Update Morphic Score when Pyro Score changes
document.getElementById("pyro-score").addEventListener("input", calculateMorphicScore);