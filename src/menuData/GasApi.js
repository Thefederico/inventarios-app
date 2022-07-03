
  const API_URL =
    "https://script.google.com/macros/s/AKfycbwYgmfZztD9pehIpp8Nvqc6mvWC4n9DfqaH2IJUSE9Q3KkpLDvOEWQ7gJJg5bV3v-3Y/exec";

  export const postApiSheetData = async (payLoad) => {
    try {
      let response = await fetch(API_URL, {
        method: "POST",
        cache: "no-cache",
        redirect: "follow",
        body: JSON.stringify(payLoad),
      });

      let data = await response.json();

      return data;
    } catch (error) {
      console.log("error en fetch", error);
      alert("Conexión de internet deficiente, regrese al menu de inicio e intente la operación nuevamente");
    }
  };
