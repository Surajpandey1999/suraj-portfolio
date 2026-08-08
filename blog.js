```javascript
document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const articles = document.querySelectorAll(".blog-card");
    const noResults = document.getElementById("noResults");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");

    let activeCategory = "all";

    function filterArticles() {

        const searchTerm = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        let visibleCount = 0;

        articles.forEach(article => {

            const category =
                article.dataset.category?.toLowerCase() || "";

            const title =
                article.dataset.title?.toLowerCase() || "";

            const content =
                article.textContent.toLowerCase();

            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;

            const matchesSearch =
                !searchTerm ||
                title.includes(searchTerm) ||
                content.includes(searchTerm);

            if (matchesCategory && matchesSearch) {

                article.style.display = "";

                visibleCount++;

            } else {

                article.style.display = "none";

            }

        });

        if (noResults) {

            noResults.style.display =
                visibleCount === 0 ? "block" : "none";

        }

    }


    /* CATEGORY FILTER */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            activeCategory =
                button.dataset.category || "all";

            filterArticles();

        });

    });


    /* SEARCH */

    if (searchInput) {

        searchInput.addEventListener("input", filterArticles);

    }


    /* MOBILE MENU */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("show");

        });

    }


    /* INITIAL FILTER */

    filterArticles();

});
```

