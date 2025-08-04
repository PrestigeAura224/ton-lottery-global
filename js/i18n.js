async function loadLanguage(lang) {
  try {
    const res = await fetch(`/js/lang/${lang}.json`);
    if (!res.ok) throw new Error();
    const translations = await res.json();
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) el.innerText = translations[key];
    });
  } catch (err) {
    if (lang !== "en") {
      console.warn(`Language ${lang} not found, fallback to English.`);
      loadLanguage("en");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let lang;
  if (window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code) {
    lang = Telegram.WebApp.initDataUnsafe.user.language_code.substring(0,2).toLowerCase();
  } else {
    lang = (navigator.language || "en").substring(0,2).toLowerCase();
  }
  
  const supported = ["en","zh","es","fr","de","ru","ar","ja","ko","hi","pt","it","tr","vi","id"];
  if (!supported.includes(lang)) lang = "en";

  localStorage.setItem("selectedLang", lang);
  loadLanguage(lang);
});
