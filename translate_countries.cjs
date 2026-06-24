const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

let tempDataContent = dataContent.replace('export const documentLibrary =', 'module.exports =');
fs.writeFileSync(path.join(__dirname, 'tempDataForTranslation.cjs'), tempDataContent);

const documentLibrary = require('./tempDataForTranslation.cjs');

const countryMap = {
  "Algeria": "Aljazair",
  "Australia": "Australia",
  "Brazil": "Brasil",
  "Burkina Faso": "Burkina Faso",
  "Burundi": "Burundi",
  "Cambodia": "Kamboja",
  "Cameroon": "Kamerun",
  "Canada": "Kanada",
  "China": "Tiongkok",
  "Colombia": "Kolombia",
  "The Democratic Republic Of the Congo": "Republik Demokratik Kongo",
  "Ecuador": "Ekuador",
  "Egypt": "Mesir",
  "Georgia": "Georgia",
  "Germany": "Jerman",
  "Ghana": "Ghana",
  "Guatemala": "Guatemala",
  "Honduras": "Honduras",
  "India": "India",
  "Indonesia": "Indonesia",
  "Isle of Man": "Isle of Man",
  "Italy": "Italia",
  "Ivory Coast": "Pantai Gading",
  "Lao People's Democratic Republic": "Republik Demokratik Rakyat Laos",
  "Malaysia": "Malaysia",
  "Mauritius": "Mauritius",
  "Mexico": "Meksiko",
  "Netherlands": "Belanda",
  "New Zealand": "Selandia Baru",
  "Nicaragua": "Nikaragua",
  "Nigeria": "Nigeria",
  "Papua New Guinea": "Papua Nugini",
  "Peru": "Peru",
  "Philippines": "Filipina",
  "Poland": "Polandia",
  "Singapore": "Singapura",
  "Spain": "Spanyol",
  "Switzerland": "Swiss",
  "Tanzania": "Tanzania",
  "Timor-Leste": "Timor Leste",
  "Turkey": "Turki",
  "Uganda": "Uganda",
  "Ukraine": "Ukraina",
  "United Arab Emirates": "Uni Emirat Arab",
  "United Kingdom": "Inggris Raya",
  "United States": "Amerika Serikat",
  "Vietnam": "Vietnam",
  "Zambia": "Zambia"
};

const translateTable = (table, isV2T) => {
  if (table.rows) {
    table.rows = table.rows.map(row => {
      return row.map(cell => {
        const text = cell.en || cell.id;
        const translatedText = countryMap[text] || text;
        
        if (isV2T) {
          // For V2T, we want 'en' to hold the translated text because that's how it's rendered
          return { en: translatedText };
        } else {
          // For V2, 'en' holds English, 'id' holds Translated
          return { en: cell.en, id: countryMap[cell.en] || cell.id };
        }
      });
    });
  }
  return table;
};

// Translate V2
const tr25v2 = documentLibrary['TR25'].versions['V2'];
if (tr25v2) {
  const appA = tr25v2.find(s => s.id === 'appendix-a');
  if (appA) {
    appA.content.forEach(block => {
      if (block.type === 'table') translateTable(block, false);
    });
  }
  const appB = tr25v2.find(s => s.id === 'appendix-b');
  if (appB) {
    appB.content.forEach(block => {
      if (block.type === 'table') translateTable(block, false);
    });
  }
}

// Translate V2T
const tr25v2t = documentLibrary['TR25'].versions['V2T'];
if (tr25v2t) {
  const appA = tr25v2t.find(s => s.id === 'appendix-a');
  if (appA) {
    appA.content.forEach(block => {
      if (block.type === 'table') translateTable(block, true);
    });
  }
  const appB = tr25v2t.find(s => s.id === 'appendix-b');
  if (appB) {
    appB.content.forEach(block => {
      if (block.type === 'table') translateTable(block, true);
    });
  }
}

// Write back
const newContent = "export const documentLibrary = " + JSON.stringify(documentLibrary, null, 2) + ";";
fs.writeFileSync(dataPath, newContent);
fs.unlinkSync(path.join(__dirname, 'tempDataForTranslation.cjs'));

console.log('Successfully translated country names in Appendices.');
