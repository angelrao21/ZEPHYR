function copyLocation() {
  const textToCopy = "Pond Area (Near MPH)";
  navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Location copied to clipboard!");
  }).catch((err) => {
      alert("Failed to copy location.");
      console.error(err);
  });
}