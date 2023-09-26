import axios from "axios";
import IMask from "imask";

// SELECT ELEMENTS
const $form = document.querySelector("[data-selector=feedback-form]");
const $greetings = document.querySelector<HTMLDivElement>(
  "[data-selector=greetings-popup]"
);

const triggers = document.querySelectorAll("[data-selector=form-trigger]");
const $formPopup = document.querySelector<HTMLElement>(
  "[data-selector=form-popup]"
);
const $formPopupBackdrop = $formPopup?.querySelector(
  "[data-selector=formpopup-backdrop]"
);

const $formError = document.querySelector<HTMLParagraphElement>(
  "[data-selector=form-popup-error]"
);

const errors = { name: false, phone: false, email: false, root: false };

// FUNCTIONS

async function sendData(
  data: { name: string; phone: string; email: string },
  elements: any
) {
  if ($formError) $formError.dataset.state = "invisible";
  try {
    const MAIL_URL = "/api/mail.php";
    const res = await axios.post(MAIL_URL, JSON.stringify(data));

    if ($greetings && $formPopup) {
      $formPopup.dataset.state = "invisible";
      $greetings.dataset.state = "visible";
    }
    resetFormData(elements);
  } catch (error) {
    errors.root = true;
    if ($formError) $formError.dataset.state = "visible";
  }
}

function resetFormData<T extends { [key: string]: HTMLInputElement }>(
  formElements: T
) {
  for (const key in formElements) {
    formElements[key].value = "";
  }
}
// LISTENERS

if ($formPopup) {
  triggers.forEach((trigger) =>
    trigger.addEventListener(
      "click",
      () => ($formPopup.dataset.state = "visible")
    )
  );

  $formPopupBackdrop?.addEventListener(
    "click",
    () => ($formPopup.dataset.state = "invisible")
  );
}

if ($greetings) {
  const $greetingsBackdrop = $greetings.querySelector(
    "[data-selector=greetings-popup-backdrop]"
  );
  $greetingsBackdrop?.addEventListener(
    "click",
    () => ($greetings.dataset.state = "invisible")
  );
}

// SUBMIT

if ($form) {
  const $inputName = $form.querySelector<HTMLInputElement>("input[name=name]");
  const $inputPhone = $form.querySelector<HTMLInputElement>("input[name=tel]");
  const $inputEmail =
    $form.querySelector<HTMLInputElement>("input[name=email]");

  if ($inputName && $inputPhone && $inputEmail) {
    const formElements = {
      name: $inputName,
      phone: $inputPhone,
      email: $inputEmail,
    };

    let formData = {
      name: $inputName.value,
      phone: $inputPhone.value,
      email: $inputEmail.value,
    };

    IMask($inputPhone, {
      mask: "+{7}(000)000-00-00",
    });

    $form.addEventListener("input", (e) => {
      const target = e.target as HTMLInputElement;
      target.dataset.state = "";
      formData = {
        name: $inputName.value,
        phone: $inputPhone.value,
        email: $inputEmail.value,
      };
    });

    $form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateInputs()) sendData(formData, formElements);
    });

    function validateInputs() {
      let error = false;
      if (!formData.name) {
        errors.name = true;
        formElements.name.dataset.state = "invalid";
        error = true;
      }
      if (
        !formData.phone ||
        !/\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(formData.phone)
      ) {
        errors.phone = true;
        formElements.phone.dataset.state = "invalid";
        error = true;
      }
      if (
        !formData.email ||
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(formData.email)
      ) {
        errors.email = true;
        formElements.email.dataset.state = "invalid";
        error = true;
      }

      if (error) return false;
      return true;
    }
  }
}
