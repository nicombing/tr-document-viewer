export const documentLibrary = {
  "AcmeCorp_2023": {
    name: "Acme Corp Master File 2023",
    versions: {
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