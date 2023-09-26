import "./style.scss";

import "./functions/form"

const mobileMenu = () => {
  const $burger = document.querySelector("[data-selector=burger-menu]");
  const $menu = document.querySelector("[data-selector=mobile-menu]");

  $burger?.addEventListener("click", () => {
    $menu?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  });

  $menu?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    if (
      target.closest(
        "[data-selector=mobile-menu-backdrop], [data-selector=close-mobile-menu], a, button"
      )
    ) {
      $menu.setAttribute("aria-hidden", "true");
      document.body.removeAttribute("style");
    }
  });
};

mobileMenu();

export {};
