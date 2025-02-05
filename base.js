function toggleMenu() {
    const burgerIcon = document.querySelector('.burger-icon');
    const navigation = document.querySelector('.navigation');
    const body = document.body;

    burgerIcon.classList.toggle('active');
    navigation.classList.toggle('active');

    if (navigation.classList.contains('active')) {
        body.classList.add('no-scroll');
    } else {
        body.classList.remove('no-scroll');
    }
}

document.addEventListener('click', (event) => {
    const burgerIcon = document.querySelector('.burger-icon');
    const navigation = document.querySelector('.navigation');
    const body = document.body;

    if (!burgerIcon.contains(event.target) && !navigation.contains(event.target)) {
        burgerIcon.classList.remove('active');
        navigation.classList.remove('active');
        body.classList.remove('no-scroll');
    }
});

// Cookie Consent Logic
document.addEventListener('DOMContentLoaded', function () {
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 1000);
    }

    acceptCookiesBtn.addEventListener('click', function () {
        cookieConsent.classList.remove('show');

        localStorage.setItem('cookiesAccepted', 'true');
    });
});

async function fetchFood() {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
        const meals = response.data.meals || [];
        console.log(meals)

        const container = document.getElementById("foodContainer");
        container.innerHTML = '';

        meals.forEach(meal => {
            const card = document.createElement("a");
            card.href = "#";
            card.classList.add("card");

            card.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h5>${meal.strMeal}</h5>
                <div class="time-fork">  
                    <p>${meal.strTags == null ? "no tags" : meal.strTags}</p>
                </div>
                <div class="like row">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z"/>
                    </svg>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error fetching food data:", error);
    }
}

fetchFood();

//validation
function validateEmail(event) {
    const emailInput = document.getElementById("emailInput");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value)) {
        alert("Please enter a valid email address.");
        event.preventDefault(); // Stop form submission
        return false;
    }
    return true;
}