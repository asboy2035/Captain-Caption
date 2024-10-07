document.getElementById('imageUploader').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const imageContainer = document.getElementById('imageContainer');
          const backgroundDiv = document.getElementById('background');
          imageContainer.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%; max-height: 400px;">`;
          backgroundDiv.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
          document.getElementById('captionOptions').style.display = 'block';
          document.getElementById('exportBtn').style.display = 'block';
          document.getElementById('imageContainer').style.display = 'block';
      };
      reader.readAsDataURL(file);
  }
});

document.getElementById('captionText').addEventListener('input', updateCaption);
document.getElementById('styleSelect').addEventListener('change', updateCaption);
document.getElementById('alignmentSelect').addEventListener('change', updateCaption);
document.getElementById('fontSelect').addEventListener('change', updateCaption);

function updateCaption() {
  const captionText = document.getElementById('captionText').value;
  const styleClass = document.getElementById('styleSelect').value;
  const alignmentClass = document.getElementById('alignmentSelect').value;
  const font = document.getElementById('fontSelect').value;

  let captionDiv = document.querySelector('.caption');
  if (!captionDiv) {
      captionDiv = document.createElement('div');
      captionDiv.classList.add('caption');
      document.getElementById('imageContainer').appendChild(captionDiv);
  }

  captionDiv.textContent = captionText;
  captionDiv.className = `caption ${styleClass} ${alignmentClass}`;
  captionDiv.style.fontFamily = font;
}

document.getElementById('exportBtn').addEventListener('click', function () {
  const imageContainer = document.getElementById('imageContainer');

  if (imageContainer) {
      // Use html2canvas with backgroundColor set to null for transparency
      html2canvas(imageContainer, { backgroundColor: null })
          .then(canvas => {
              const link = document.createElement('a');
              link.href = canvas.toDataURL('image/png');
              link.download = 'image-with-caption.png';
              link.click();
          })
          .catch(error => {
              console.error('Error exporting image:', error);
              alert('There was an error exporting the image. Please try again.');
          });
  } else {
      alert('Image container not found. Please upload an image first.');
  }
});
