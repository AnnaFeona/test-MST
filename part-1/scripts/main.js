const body = document.body;

const initBurger = () => {
  const burger = document.querySelector(".burger__btn");
  const burgerMenu = document.querySelector(".burger-menu");
  const menuLinks = document.querySelectorAll(".burger-menu-list a");
  const logo = document.querySelector(".logo__container");

  const toggleMenu = () => {
    burger.classList.toggle("active");
    burgerMenu.classList.toggle("active");

    if (burgerMenu.classList.contains("active")) {
      body.classList.add("scroll-lock");
    } else {
      body.classList.remove("scroll-lock");
    }
  };

  burger.addEventListener("click", toggleMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (burgerMenu.classList.contains("active")) {
        toggleMenu();
      }

      burgerMenu.addEventListener("transitionend", (e) => {
        if (window.location.href !== link.href) {
          window.location.href = link.href;
        }
      });
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && burgerMenu.classList.contains("active")) {
      burger.classList.remove("active");
      burger.classList.add("hodden");
      burgerMenu.classList.remove("active");
      burgerMenu.classList.add("hidden");

      body.classList.remove("scroll-lock");
    }
  });
};

const initScroll = () => {
  const header = document.querySelector(".header");
  const handleScroll = () => {
    if (window.scrollY > 5) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
};

const initForm = () => {
  const form = document.querySelector("#contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const targetForm = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const privacy = form.privacy.checked;

    const formValue = {
      name,
      email,
      privacy,
    };

    sendForm(formValue);
    showNotification(`Thank you, ${name}, for your answer.`);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initBurger();
  initScroll();
  initForm();
});

function sendForm(data) {
  console.log("Form submitted", data);
}

function showNotification(message) {
  const container = document.getElementById("notification__container");

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.innerHTML = `
    <button class="close-btn">&times;</button>
    <p>${message}</p>
    <div class="progress-bar"></div>
  `;

  container.appendChild(notification);

  const timeout = setTimeout(() => {
    container.removeChild(notification);
  }, 3000);

  // Удалить по кнопке
  notification.querySelector(".close-btn").addEventListener("click", () => {
    clearTimeout(timeout);
    container.removeChild(notification);
  });
}
