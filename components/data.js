export const documentLibrary = {
  "AcmeCorp_2023": {
    name: "Acme Corp Master File 2023",
    versions: {
      "V1": [
        {
          id: "table-of-contents",
          title: "Table of Contents",
          content: [
            { type: "paragraph", en: "1. Executive Summary", id: "1. Ringkasan Eksekutif" },
            { type: "paragraph", en: "2. Business Overview", id: "2. Tinjauan Bisnis" }
          ]
        },
        {
          id: "executive-summary",
          title: "1. Executive Summary",
          content: [
            {
              type: "paragraph",
              en: "This document serves as a master file for Acme Corp for the financial year ended 31 December 2023.",
              id: "Dokumen ini berfungsi sebagai dokumen induk untuk Acme Corp untuk tahun buku yang berakhir pada tanggal 31 Desember 2023."
            },
            {
              type: "paragraph",
              en: "The purpose of this report is to document the overview of Acme Corp's global business.",
              id: "Tujuan laporan ini adalah untuk mendokumentasikan gambaran umum bisnis global Acme Corp."
            }
          ]
        }
      ]
    }
  },
  "AcmeCorp_2024": {
    name: "Acme Corp Master File 2024",
    versions: {
      "V1": [
        {
          id: "table-of-contents",
          title: "Table of Contents",
          content: [
            { type: "paragraph", en: "1. Executive Summary", id: "1. Ringkasan Eksekutif" },
            { type: "paragraph", en: "2. Business Overview", id: "2. Tinjauan Bisnis" }
          ]
        },
        {
          id: "executive-summary",
          title: "1. Executive Summary",
          content: [
            {
              type: "paragraph",
              en: "This document serves as a master file for Acme Corp for the financial year ended 31 December 2024.",
              id: "Dokumen ini berfungsi sebagai dokumen induk untuk Acme Corp untuk tahun buku yang berakhir pada tanggal 31 Desember 2024."
            },
            {
              type: "paragraph",
              en: "The purpose of this report is to document the overview of Acme Corp's global business and supply chain.",
              id: "Tujuan laporan ini adalah untuk mendokumentasikan gambaran umum bisnis global dan rantai pasokan Acme Corp."
            }
          ]
        }
      ]
    }
  }
};

export const addDocumentToLibrary = (key, data) => {
  documentLibrary[key] = data;
};