function copyLocation() {
    const location = document.getElementById("locationText").textContent;
    navigator.clipboard.writeText(location).then(() => {
        alert("Location copied to clipboard!");
    }).catch((err) => {
        alert("Failed to copy location.");
        console.error(err);
    });
  }