// CV Viewer Functionality
const CV_PATH = 'CV/AHMED ALSAKKAF CV.pdf';

// Open CV Modal
function openCVModal(event) {
  if (event) {
    event.preventDefault();
  }
  
  const modal = document.getElementById('cvModal');
  const pdfEmbed = document.getElementById('cvPdfEmbed');
  const fallback = document.getElementById('cvFallback');
  
  // Set the PDF source
  pdfEmbed.src = CV_PATH;
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Check if PDF loaded successfully
  pdfEmbed.onerror = function() {
    pdfEmbed.style.display = 'none';
    fallback.classList.add('active');
  };
  
  pdfEmbed.onload = function() {
    fallback.classList.remove('active');
    pdfEmbed.style.display = 'block';
  };
}

// Close CV Modal
function closeCVModal() {
  const modal = document.getElementById('cvModal');
  const pdfEmbed = document.getElementById('cvPdfEmbed');
  
  modal.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
  
  // Clear PDF source to stop loading
  setTimeout(() => {
    pdfEmbed.src = '';
  }, 300);
}

// Download CV
function downloadCV() {
  const link = document.createElement('a');
  link.href = CV_PATH;
  link.download = 'Ahmed_Alsakkaf_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('cvModal');
  
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeCVModal();
      }
    });
  }
  
  // Close on ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeCVModal();
    }
  });
  
  // Add click handlers to all CV links
  const cvLinks = document.querySelectorAll('a[href*="CV/"]');
  cvLinks.forEach(link => {
    // Only modify links that point to PDF files
    if (link.href.toLowerCase().includes('.pdf')) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        openCVModal();
      });
    }
  });
});
