

document.addEventListener('DOMContentLoaded', function() {
  const filterLinks = document.querySelectorAll('#filters a');

  filterLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const category = this.getAttribute('data-category');
      selectCategory(category);
    });
  });
});

function selectCategory(category) {
  window.location.href = `/posts?category=${category}`;
}
