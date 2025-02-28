function updateTimeframes() {
    let midpoint = document.getElementById("midpoint-select").value;
    let ltf, htf;

    // Correct LTF & HTF Assignments
    if (midpoint === "3M") { ltf = "2M"; htf = "12M"; }
    else if (midpoint === "5M") { ltf = "3M"; htf = "20M"; }
    else if (midpoint === "15M") { ltf = "5M"; htf = "1H"; }
    else if (midpoint === "30M") { ltf = "7M"; htf = "2H"; }
    else if (midpoint === "1H") { ltf = "15M"; htf = "4H"; }

    // Update UI with the selected timeframes
    document.getElementById("ltf-display").innerText = `LTF: ${ltf}`;
    document.getElementById("htf-display").innerText = `HTF: ${htf}`;
}

// Attach event listener to dropdown
document.getElementById("midpoint-select").addEventListener("change", updateTimeframes);