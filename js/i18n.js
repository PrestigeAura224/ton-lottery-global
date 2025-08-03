async function loadLanguage(lang) {
  try {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.innerText = translations[key];
      }
    });
  } catch (error) {
    console.error("Language load error:", error);
  }
}

function getBrowserLanguage() {
  const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
  if (tgLang) return tgLang.split("-")[0];
  return navigator.language.split("-")[0];
}

function populateLanguageSwitcher() {
  const langSwitcher = document.getElementById("languageSwitcher");
  if (!langSwitcher) return;

  const supportedLanguages = [
    "en","zh","es","fr","de","ru","ja","ko","ar","pt","hi","id","tr","vi","it"
  ];

  supportedLanguages.forEach(lang => {
    const option = document.createElement("option");
    option.value = lang;
    option.text = lang.toUpperCase();
    langSwitcher.appendChild(option);
  });

  langSwitcher.addEventListener("change", () => {
    const lang = langSwitcher.value;
    loadLanguage(lang);
    localStorage.setItem("selectedLang", lang);
  });

  const savedLang = localStorage.getItem("selectedLang") || getBrowserLanguage();
  langSwitcher.value = supportedLanguages.includes(savedLang) ? savedLang : "en";
  loadLanguage(langSwitcher.value);
}

document.addEventListener("DOMContentLoaded", () => {
  populateLanguageSwitcher();
});

function i18n(key) {
  return key; // fallback for dynamic text
}
