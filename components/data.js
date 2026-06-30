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
  },
  'Journey2Quit': {
    name: 'Journey2Quit Workbook',
    versions: {
      'V1': [
        {
          id: 'title',
          title: 'Title Page',
          content: [
            { type: 'paragraph', en: 'Journey2Quit', id: 'PerjalananUntukBerhenti' },
            { type: 'paragraph', en: 'A Workbook to Help You Quit Smoking', id: 'Buku Kerja untuk Membantu Anda Berhenti Merokok' }
          ]
        },
        {
          id: 'introduction',
          title: 'Introduction',
          content: [
            { type: 'paragraph', en: 'Welcome to Journey2Quit.', id: 'Selamat datang di Journey2Quit.' },
            { type: 'paragraph', en: 'Quitting smoking is a journey. It takes time, patience, and practice. This workbook will guide you through the process.', id: 'Berhenti merokok adalah sebuah perjalanan. Dibutuhkan waktu, kesabaran, dan latihan. Buku kerja ini akan memandu Anda melalui proses tersebut.' }
          ]
        },
        {
          id: 'section-1',
          title: 'Section 1: GET READY!',
          content: [
            { type: 'paragraph', en: 'Why do you smoke?', id: 'Mengapa Anda merokok?' },
            { type: 'paragraph', en: 'Understanding why you smoke is the first step to quitting. Take the tobacco addiction quiz below to learn about your habits.', id: 'Memahami mengapa Anda merokok adalah langkah pertama untuk berhenti. Ikuti kuis kecanduan tembakau di bawah ini untuk mempelajari kebiasaan Anda.' }
          ]
        },
        {
          id: 'costs',
          title: 'Think About The Costs',
          content: [
            { type: 'paragraph', en: 'Smoking costs you in many ways. It costs money, damages your health, and affects the people around you.', id: 'Merokok merugikan Anda dalam banyak hal. Ini memakan biaya, merusak kesehatan Anda, dan memengaruhi orang-orang di sekitar Anda.' },
            { type: 'paragraph', en: 'Benefits of Quitting', id: 'Manfaat Berhenti Merokok' },
            { type: 'paragraph', en: 'Within 20 minutes, your heart rate drops. Within a year, your risk of heart disease is cut in half.', id: 'Dalam 20 menit, detak jantung Anda menurun. Dalam satu tahun, risiko penyakit jantung Anda berkurang setengahnya.' }
          ]
        }
      ]
    }
  }
};

export const addDocumentToLibrary = (key, data) => {
  documentLibrary[key] = data;
};