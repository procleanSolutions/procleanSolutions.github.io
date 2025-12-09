document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const serviceBtns = document.querySelectorAll(".service-btn");
  const serviceInput = document.getElementById("service");

  // Rellenar el campo de servicio al hacer clic en "Solicitar"
  serviceBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      serviceInput.value = btn.dataset.service;
      window.location.hash = "contact";
    });
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = form.querySelector("#address").value.trim();
    const service = document.getElementById("service").value.trim();
    const message = document.getElementById("message").value.trim();
    const date = form.date.value;
    const time = form.time.value;

    // Validaciones básicas
    if (name.length < 3) return showError("⚠️ Please enter your full name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showError("⚠️ Invalid email address.");
    if (!/^[0-9+ ]{7,15}$/.test(phone)) return showError("⚠️ Invalid phone number.");
    if (address.length < 5) return showError("⚠️ Please enter a valid address.");
    if (message.length < 10) return showError("⚠️ Message must be at least 10 characters.");

    // Enviar con EmailJS
    emailjs.send("service_ggacurv", "template_1de8ct5", {
      name,
      email,
      phone,
      address,
      service,
      message,
      date,
      time
    })
    .then(() => {
      formMessage.textContent = "✅ Thank you! Your message has been sent.";
      formMessage.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      showError("❌ Error sending message. Please try again later.");
    });
  });

  function showError(msg) {
    formMessage.textContent = msg;
    formMessage.style.color = "red";
  }
});

/* -------------------------------
   Full House Deep Cleaning forms
---------------------------------*/
const deepCleanButtons = document.querySelectorAll(".select-service-btn");

deepCleanButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const serviceValue = button.dataset.service;
    const serviceInput = document.getElementById("service");
    serviceInput.value = serviceValue;

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* -------------------------------
   Weekly / Bi-Weekly forms
---------------------------------*/
const weeklyForms = document.querySelectorAll(".weeklyForm");

weeklyForms.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selected = form.querySelector("input[name='weekly']").value;
    if (!selected) {
      alert("⚠️ Please select a package.");
      return;
    }

    const serviceInput = document.getElementById("service");
    serviceInput.value = selected;

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* -------------------------------
   Booking Form en Home
---------------------------------*/
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = bookingForm.name.value.trim();
    const email = bookingForm.email.value.trim();
    const phone = bookingForm.phone.value.trim();
    const address = bookingForm.querySelector("#address").value.trim(); // ✅ agregado
    const service = bookingForm.service.value.trim();
    const date = bookingForm.date.value;
    const time = bookingForm.time.value;
    const message = bookingForm.message.value.trim();

    if (!name || !email || !phone || !address || !service || !date || !time) { // ✅ incluye address
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    emailjs.send("service_ggacurv", "template_1de8ct5", {
      name,
      email,
      phone,
      address, // ✅ agregado
      service,
      date,
      time,
      message
    }).then(
      () => {
        document.getElementById("bookingMessage").innerText = "✅ Booking request sent successfully!";
        bookingForm.reset();
        setTimeout(() => (bookingMessage.textContent = ""), 4000); // ✅ se oculta
      },
      
      (error) => {
        console.error("EmailJS Error:", error);
        document.getElementById("bookingMessage").innerText = "❌ Error sending booking: " + error.text;
      }
    );
  });
}

/* -------------------------------
   Donation Form simplificado
---------------------------------*/
const donationForm = document.getElementById("donationForm");
if (donationForm) {
  donationForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const donationAmount = donationForm.donationAmount.value.trim();
    const paymentMethod = donationForm.paymentMethod.value;
    const donationMessage = document.getElementById("donationMessage");

    if (!donationAmount || donationAmount <= 0 || !paymentMethod) {
      donationMessage.textContent = "⚠️ Please enter an amount and select a payment method.";
      donationMessage.style.color = "red";
      return;
    }

    donationMessage.textContent = "Redirecting to payment gateway...";
    donationMessage.style.color = "blue";

    let redirectUrl = "";
    if (paymentMethod === "paypal") {
      redirectUrl = `https://www.paypal.com/donate?business=TU_CORREO_PAYPAL&amount=${donationAmount}&currency_code=EUR`;
    } else if (paymentMethod === "aib") {
      redirectUrl = `https://onlinebanking.aib.ie/inet/roi/login.htm`;
    } else if (paymentMethod === "boi") {
      redirectUrl = `https://www.365online.com/servlet/com.ibm.wps.portletbridgemvc.servlet.PortletBridgeServlet/login`;
    } else if (paymentMethod === "revolut") {
      redirectUrl = `https://revolut.me/TU_USUARIO/${donationAmount}`;
    }

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1500);
  });
}


/* -------------------------------
   Gift Card Form
---------------------------------*/
const giftCardForm = document.getElementById("bookingFormGift");

if (giftCardForm) {
  giftCardForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const recipientName = document.getElementById("giftName").value.trim();
    const recipientEmail = document.getElementById("giftEmail").value.trim();
    const giftPhone = document.getElementById("giftPhone").value.trim();
    const giftAddress = document.getElementById("giftAddress").value.trim();
    const giftService = document.getElementById("giftService").value.trim();
    const giftDate = document.getElementById("giftDate").value;
    const giftTime = document.getElementById("time").value; // ✅ agregado
    const giftMessage = document.getElementById("giftMessage").value.trim();
    const giftBookingMessage = document.getElementById("giftBookingMessage");

    if (!recipientName || !recipientEmail || !giftPhone || !giftAddress || !giftService || !giftDate || !giftTime) { // ✅ incluye hora
      giftBookingMessage.textContent = "⚠️ Please complete all required fields.";
      giftBookingMessage.style.color = "red";
      return;
    }

    emailjs.send("service_ggacurv", "template_8r0hsnp", {
      recipient_name: recipientName,
      recipient_email: recipientEmail,
      phone: giftPhone,
      address: giftAddress,
      service: giftService,
      date: giftDate,
      time: giftTime, // ✅ agregado
      message: giftMessage
    })
    .then(() => {
      giftBookingMessage.textContent = `✅ ${recipientName}, we will respond as soon as possible to schedule your gift card service.`;
      giftBookingMessage.style.color = "green";
      giftCardForm.reset();

      // Oculta el mensaje después de 4 segundos
      setTimeout(() => {
        giftBookingMessage.textContent = "";
      }, 4000);
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      giftBookingMessage.textContent = "❌ Error sending gift card. Please try again later.";
      giftBookingMessage.style.color = "red";
    });
  });
}


/* -------------------------------
   Navegación y animaciones
---------------------------------*/
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

const hero = document.querySelector(".hero");
if (hero) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    hero.style.backgroundPositionY = `${scrollY * 0.4}px`;

    hero.querySelectorAll("h1, p, .btn").forEach((el, i) => {
      el.style.transform = `translateY(${scrollY * 0.2}px)`;
      el.style.opacity = Math.max(1 - scrollY / 400, 0);
    });
  });
}

/* -------------------------------
   Servicios adicionales
---------------------------------*/
const additionalServiceBtn = document.getElementById("additionalServiceBtn");
if (additionalServiceBtn) {
  additionalServiceBtn.addEventListener("click", () => {
    const dropdown = document.getElementById("additionalServices");
    const selectedService = dropdown.value;

    if (!selectedService) {
      alert("⚠️ Please select an additional service.");
      return;
    }

    const serviceInput = document.getElementById("service");
    serviceInput.value = selectedService;

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Seleccionar servicio desde tabla de Deep Cleaning
const deepTableBtns = document.querySelectorAll(".select-service-btn");
deepTableBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const serviceInput = document.getElementById("service");
    serviceInput.value = btn.dataset.service;

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});
