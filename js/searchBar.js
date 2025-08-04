      const searchBox = document.getElementById("search-box");
      const menuToggle = document.getElementById("menu-wrapper");
      const suggestionList = document.getElementById("suggestion-list");
      const nav = document.getElementById("mobile-nav");

      const body = document.body;
      

      function showSuggestions() {
        suggestionList.style.display = "block";
        body.classList.add("blurred");
      }

      function hideSuggestions() {
        suggestionList.style.display = "none";
        body.classList.remove("blurred");
      }

      // Show suggestions
      searchBox.addEventListener("focus", showSuggestions);
      searchBox.addEventListener("click", showSuggestions);

      // Hide when clicking outside
      document.addEventListener("click", function (e) {
        const isClickInside = document
          .getElementById("search-container")
          .contains(e.target);
        if (!isClickInside) {
          hideSuggestions();
        }
      });

      // Toggle nav
     
 

  // Toggle on button click
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent click from reaching document
    nav.classList.toggle("show");
  });

  // Prevent menu click from closing itself
  nav.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Close when clicking outside
  document.addEventListener("click", () => {
    nav.classList.remove("show");
  });


      



    
  

