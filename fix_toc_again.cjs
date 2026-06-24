const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

let tempDataContent = dataContent.replace('export const documentLibrary =', 'module.exports =');
fs.writeFileSync(path.join(__dirname, 'tempDataTocFix.cjs'), tempDataContent);

const documentLibrary = require('./tempDataTocFix.cjs');

const newTocData = [
  { en: "1. Executive summary", id: "1. Ringkasan Eksekutif" },
  { en: " Introduction", id: " Perkenalan" },
  { en: " Purpose and scope", id: " Tujuan dan ruang lingkup" },
  { en: " Master File content requirements", id: " Persyaratan konten Dokumen Induk" },
  { en: "2. Organisational structure", id: "2. Struktur Organisasi" },
  { en: " Background", id: " Latar belakang" },
  { en: " Legal and ownership structure", id: " Struktur hukum dan kepemilikan" },
  { en: " Geographic locations", id: " Lokasi geografis" },
  { en: "3. ofi Group's business", id: "3. Bisnis ofi Group" },
  { en: " Overview of ofi Group's business", id: " Sekilas tentang bisnis ofi Group" },
  { en: " Products / Business segments / Markets", id: " Produk / Segmen Usaha / Pasar" },
  { en: " Important drivers of business profit", id: " Penggerak penting keuntungan bisnis" },
  { en: " Summary of functional analysis", id: " Ringkasan analisis fungsional" },
  { en: " Acquisitions and divestitures", id: " Akuisisi dan divestasi" },
  { en: "4. Intangibles", id: "4. Aktiva Tidak Berwujud" },
  { en: " Overview & Group Strategy", id: " Tinjauan Umum & Strategi Grup" },
  { en: " R&D organisation", id: " Organisasi Penelitian dan Pengembangan (R&D)" },
  { en: " Details of major intangibles", id: " Rincian aktiva tidak berwujud utama" },
  { en: " Important agreements and transfer pricing policy", id: " Perjanjian penting dan kebijakan harga transfer" },
  { en: " Important transfers of intangibles", id: " Pengalihan penting atas aktiva tidak berwujud" },
  { en: "5. Intercompany Financial Activities", id: "5. Aktivitas Keuangan Antar Perusahaan" },
  { en: " Group financing overview", id: " Tinjauan pembiayaan grup" },
  { en: " External financing arrangements", id: " Pengaturan pembiayaan eksternal" },
  { en: " Central financing functions", id: " Fungsi pembiayaan sentral" },
  { en: " Intercompany financing – transfer pricing policy", id: " Pembiayaan antar perusahaan – kebijakan harga transfer" },
  { en: "6. Important Service Agreements", id: "6. Perjanjian Layanan Penting" },
  { en: "7. Financial and tax position", id: "7. Posisi keuangan dan perpajakan" },
  { en: " Financial results", id: " Hasil keuangan" },
  { en: " Advance Pricing Arrangements (\"APAs\") and other tax rulings", id: " Perjanjian Harga di Muka (\"APA\") dan peraturan perpajakan lainnya" },
  { en: "8. Scope", id: "8. Ruang Lingkup" },
  { en: " Scope of the report", id: " Ruang lingkup laporan" },
  { en: " Work performed", id: " Pekerjaan dilakukan" },
  { en: " Limitations of the report", id: " Keterbatasan laporan" }
];

const updateTOC = (versionData, isT) => {
  if (!versionData) return;
  const tocSection = versionData.find(s => s.id === 'table-of-contents');
  if (tocSection) {
    if (isT) {
      tocSection.content = newTocData.map(item => ({
        type: "paragraph",
        en: item.id
      }));
    } else {
      tocSection.content = newTocData.map(item => ({
        type: "paragraph",
        en: item.en,
        id: item.id
      }));
    }
  }
};

updateTOC(documentLibrary['TR25'].versions['V3'], false);
updateTOC(documentLibrary['TR25'].versions['V3T'], true);
updateTOC(documentLibrary['TR24'].versions['V3'], false);
updateTOC(documentLibrary['TR24'].versions['V3T'], true);

// Write back
const newContent = "export const documentLibrary = " + JSON.stringify(documentLibrary, null, 2) + ";";
fs.writeFileSync(dataPath, newContent);
fs.unlinkSync(path.join(__dirname, 'tempDataTocFix.cjs'));

console.log('Successfully updated TOC matches in V3 and V3T for TR24 and TR25.');
