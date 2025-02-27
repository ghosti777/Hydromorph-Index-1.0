function calculateHydro() {
    let hydroScore = 0;
    
    let midpoint = "Auto-Detected"; 
    document.getElementById("midpoint-display").innerText = midpoint;

    let sniperMode = document.getElementById("sniper-entry").checked;
    let ltfWeight = sniperMode ? 0.45 : 0.2857;
    let htfWeight = sniperMode ? 0.40 : 0.5714;

    let includeLTF = document.getElementById("ltf-toggle").checked;
    let includeHTF = document.getElementById("htf-toggle").checked;

    if (includeLTF) hydroScore += 100 * ltfWeight;
    if (includeHTF) hydroScore += 100 * htfWeight;

    let pyroScore = 70; // Placeholder
    let morphicScore = (pyroScore * 0.65) + (hydroScore * 0.35);

    document.getElementById("hydro-score").innerText = hydroScore.toFixed(1);
    document.getElementById("morphic-score").innerText = morphicScore.toFixed(1);

    let rating = morphicScore >= 90 ? "🔥 Ultra Strong"
        : morphicScore >= 75 ? "✅ Strong"
        : morphicScore >= 50 ? "⚠️ Moderate"
        : morphicScore >= 30 ? "❓ Low"
        : "🚫 Weak";

    document.getElementById("strength-rating").innerText = `Strength Rating: ${rating}`;
}
