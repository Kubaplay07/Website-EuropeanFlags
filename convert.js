// Get the file input element and the convert button
const fileInput = document.getElementById('file-input');
const convertButton = document.getElementById('convert-button');

// Add an event listener to the convert button
convertButton.addEventListener('click', () => {
  // Get the file that was selected by the user
  const file = fileInput.files[0];
  
  // Check if the file is a valid SVG file
  if (file && file.type === 'image/svg+xml') {
    // Load the SVG file using the js-ico library
    ico.load(file).then((svg) => {
      // Convert the SVG to ICO format
      ico.convert(svg).then((icoData) => {
        // Create a new Blob object with the ICO data
        const blob = new Blob([icoData], {type: 'image/x-icon'});
        
        // Create a URL for the ICO file
        const url = URL.createObjectURL(blob);
        
        // Create a link element and trigger a download of the ICO file
        const link = document.createElement('a');
        link.href = url;
        link.download = 'icon.ico';
        link.click();
        
        // Revoke the URL to clean up
        URL.revokeObjectURL(url);
      });
    });
  } else {
    // If the file is not a valid SVG, show an error message
    alert('Please select a valid SVG file.');
  }
});