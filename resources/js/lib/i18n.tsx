import { useSyncExternalStore } from 'react';

export type Language = 'en' | 'id';

/* -------------------------------------------------------------------------- */
/*  Translation dictionary                                                    */
/* -------------------------------------------------------------------------- */

const translations = {
    /* ── Chrome / Nav ─────────────────────────────────────────────────── */
    openMenu: { en: 'Open menu', id: 'Buka menu' },
    navMenu: { en: 'Menu', id: 'Menu' },
    navDashboard: { en: 'Dashboard', id: 'Dashboard' },
    navPersonal: { en: 'Personal', id: 'Pribadi' },
    navSavings: { en: 'Savings', id: 'Tabungan' },
    navCashflow: { en: 'Cashflow', id: 'Arus Kas' },
    navReminders: { en: 'Reminders', id: 'Pengingat' },
    navBusiness: { en: 'Business', id: 'Bisnis' },
    navOthers: { en: 'More', id: 'Lainnya' },
    navSettings: { en: 'Settings', id: 'Pengaturan' },

    /* ── Page titles (Head + headings) ────────────────────────────────── */
    pageDashboard: { en: 'Dashboard', id: 'Beranda' },
    pagePersonal: { en: 'Personal', id: 'Pribadi' },
    pageSavingsIndex: { en: 'Savings', id: 'Nabung' },
    pageSavingsShow: { en: 'Savings Detail', id: 'Detail Tabungan' },
    pageCashflowIndex: { en: 'Cashflow', id: 'Kas' },
    pageCashflowShow: { en: 'Cashflow Detail', id: 'Detail Kas' },
    pageReminders: { en: 'Reminders', id: 'Ingetin' },
    pageBusinessIndex: { en: 'Business', id: 'Bisnis' },
    pageBusinessCreate: { en: 'New Business', id: 'Bisnis Baru' },
    pageBusinessShow: { en: 'Business Detail', id: 'Detail Bisnis' },
    pageSettingsProfile: { en: 'Profile', id: 'Profil' },
    pageSettingsNotifications: { en: 'Notifications', id: 'Notifikasi' },
    pageSettingsSecurity: { en: 'Security', id: 'Keamanan' },
    pageSettingsAppearance: {
        en: 'Appearance & Sound',
        id: 'Tampilan & Suara',
    },
    pageSettingsAbout: { en: 'About', id: 'Tentang App' },
    pageWelcome: { en: 'Welcome', id: 'Selamat Datang' },

    /* ── Language toggle ──────────────────────────────────────────────── */
    langLabel: { en: 'Language', id: 'Bahasa' },
    langDescription: {
        en: 'Choose the language for the app',
        id: 'Pilih bahasa aplikasi',
    },

    /* ── Common / shared ──────────────────────────────────────────────── */
    save: { en: 'Save', id: 'Simpan' },
    cancel: { en: 'Cancel', id: 'Batal' },
    delete: { en: 'Delete', id: 'Hapus' },
    add: { en: 'Add', id: 'Tambah' },
    edit: { en: 'Edit', id: 'Ubah' },
    close: { en: 'Close', id: 'Tutup' },
    back: { en: 'Back', id: 'Kembali' },
    title: { en: 'Title', id: 'Judul' },
    name: { en: 'Name', id: 'Nama' },
    amount: { en: 'Amount', id: 'Nominal' },
    date: { en: 'Date', id: 'Tanggal' },
    note: { en: 'Note (optional)', id: 'Catatan (opsional)' },
    noteDetail: { en: 'Additional details', id: 'Detail tambahan' },
    savingsLetSave: { en: "Let's Save", id: 'Ayo Nabung' },
    moreDetails: { en: 'Additional details', id: 'Detail tambahan' },
    example: { en: 'Example', id: 'Contoh' },
    next: { en: 'Next', id: 'Berikutnya' },
    previous: { en: 'Previous', id: 'Sebelumnya' },
    search: { en: 'Search…', id: 'Cari…' },
    allStatus: { en: 'All status', id: 'Semua status' },
    sortBy: { en: 'Sort by', id: 'Urutan' },
    newest: { en: 'Newest', id: 'Terbaru' },
    oldest: { en: 'Oldest', id: 'Terlama' },
    empty: { en: 'Nothing here yet', id: 'Kosong' },
    saveChanges: { en: 'Save changes', id: 'Simpan perubahan' },
    tryAgain: { en: 'Try Again', id: 'Coba Lagi' },
    confirm: { en: 'Confirm', id: 'Konfirmasi' },

    /* ── Appearance tabs ──────────────────────────────────────────────── */
    themeLight: { en: 'Light', id: 'Terang' },
    themeDark: { en: 'Dark', id: 'Gelap' },
    themeSystem: { en: 'System', id: 'Sistem' },

    /* ── Pagination ───────────────────────────────────────────────────── */
    paginationPrev: { en: 'Previous', id: 'Sebelumnya' },
    paginationNext: { en: 'Next', id: 'Berikutnya' },

    /* ── Netto badge ──────────────────────────────────────────────────── */
    nettoDeficit: { en: 'Deficit', id: 'Defisit' },
    nettoSurplus: { en: 'Surplus', id: 'Surplus' },
    nettoEven: { en: 'Even', id: 'Impas' },

    /* ── Settings layout ──────────────────────────────────────────────── */
    settingsTitle: { en: 'Settings', id: 'Pengaturan' },
    settingsDescription: {
        en: 'Manage your profile, security, and preferences',
        id: 'Kelola profil, keamanan, dan preferensi akunmu',
    },
    settingsAccount: { en: 'Account Info', id: 'Informasi Akun' },
    settingsAppearance: { en: 'Appearance & Sound', id: 'Tampilan & Suara' },
    settingsAbout: { en: 'About App', id: 'Tentang App' },
    settingsUpdateAvailable: {
        en: 'Update available',
        id: 'Update tersedia',
    },

    /* ── Settings: Profile ────────────────────────────────────────────── */
    profileTitle: { en: 'Profile', id: 'Profil' },
    profileDescription: {
        en: 'Manage your name and email',
        id: 'Kelola nama dan alamat emailmu',
    },
    profileNameLabel: { en: 'Name', id: 'Nama' },
    profileNameHelp: {
        en: 'Name displayed in the app',
        id: 'Nama yang tampil di aplikasi',
    },
    profileNamePlaceholder: { en: 'Full name', id: 'Nama lengkap' },
    profileEmailLabel: { en: 'Email address', id: 'Alamat email' },
    profileEmailHelp: {
        en: 'Email cannot be changed after registration',
        id: 'Email tidak dapat diubah setelah terdaftar',
    },
    profileVerified: { en: 'Verified', id: 'Terverifikasi' },
    profileUnverified: { en: 'Unverified', id: 'Belum terverifikasi' },
    profileVerifyHelp: {
        en: 'Your email is not verified yet. Resend the verification link to unlock all features.',
        id: 'Email kamu belum diverifikasi. Kirim ulang tautan verifikasi untuk mengaktifkan semua fitur.',
    },
    profileResendVerify: {
        en: 'Resend verification',
        id: 'Kirim ulang verifikasi',
    },
    profileVerifySent: {
        en: 'A new verification link has been sent.',
        id: 'Tautan verifikasi baru telah dikirim.',
    },
    profileChangePassword: {
        en: 'Change password',
        id: 'Ubah password',
    },
    profilePasswordHelp: {
        en: 'Use a long and unique password',
        id: 'Gunakan password yang panjang dan unik',
    },
    profileCurrentPassword: {
        en: 'Current password',
        id: 'Password saat ini',
    },
    profileNewPassword: {
        en: 'New password',
        id: 'Password baru',
    },
    profileConfirmPassword: {
        en: 'Confirm password',
        id: 'Konfirmasi password',
    },
    profileConfirmPasswordHelp: {
        en: 'Re-enter new password',
        id: 'Ulangi password baru',
    },
    profileSavePassword: {
        en: 'Save password',
        id: 'Simpan password',
    },
    profileAccountSection: { en: 'Account', id: 'Akun' },
    profileAccountHelp: {
        en: 'Sign out or delete your account',
        id: 'Keluar atau hapus akunmu',
    },
    profileSignOut: { en: 'Sign out', id: 'Keluar' },
    profileDeleteAccount: {
        en: 'Delete account',
        id: 'Hapus akun',
    },
    profileDeleteConfirm: {
        en: 'Are you sure you want to delete your account?',
        id: 'Yakin ingin menghapus akunmu?',
    },
    profileDeleteHelp: {
        en: 'All your data and resources will be permanently deleted. Enter your password to confirm.',
        id: 'Semua data dan resource akun akan dihapus permanen. Masukkan password untuk mengonfirmasi.',
    },

    /* ── Settings: Notifications ──────────────────────────────────────── */
    notificationsTitle: {
        en: 'Notifications',
        id: 'Notifikasi',
    },
    notificationsDescription: {
        en: 'Choose a sound for reminder notifications',
        id: 'Pilih suara untuk notifikasi pengingat',
    },
    notificationsSoundLabel: {
        en: 'Reminder sound',
        id: 'Suara pengingat',
    },
    notificationsDefaultSound: {
        en: 'Follows the device default notification sound',
        id: 'Mengikuti suara notifikasi default perangkat',
    },
    notificationsPlaying: {
        en: 'Playing preview',
        id: 'Memutar preview',
    },

    /* ── Settings: Security ───────────────────────────────────────────── */
    securityTitle: { en: 'Security', id: 'Keamanan' },
    securityDescription: {
        en: 'Keep your account safe with a strong password',
        id: 'Jaga akunmu tetap aman dengan password yang kuat',
    },
    securityChangePassword: {
        en: 'Change password',
        id: 'Ubah password',
    },
    securityPasswordHelp: {
        en: 'Use a long and unique password',
        id: 'Gunakan password yang panjang dan unik',
    },
    securityCurrentPassword: {
        en: 'Current password',
        id: 'Password saat ini',
    },
    securityNewPassword: {
        en: 'New password',
        id: 'Password baru',
    },
    securityConfirmPassword: {
        en: 'Confirm password',
        id: 'Konfirmasi password',
    },
    securityConfirmPasswordHelp: {
        en: 'Re-enter new password',
        id: 'Ulangi password baru',
    },
    securityTips: {
        en: 'Tip: mix uppercase letters, numbers, and symbols, and avoid reusing passwords from other sites.',
        id: 'Tips: kombinasikan huruf besar, angka, dan simbol, serta jangan pakai password yang sama di aplikasi lain.',
    },
    securitySavePassword: {
        en: 'Save password',
        id: 'Simpan password',
    },

    /* ── Settings: Appearance ─────────────────────────────────────────── */
    appearanceTitle: {
        en: 'Appearance & Sound',
        id: 'Tampilan dan Suara',
    },
    appearanceDescription: {
        en: 'Choose the theme and notification sound that suits you',
        id: 'Pilih tema dan suara notifikasi yang paling nyaman untukmu',
    },
    appearanceThemeLabel: { en: 'App theme', id: 'Tema aplikasi' },
    appearanceSoundLabel: {
        en: 'Reminder sound',
        id: 'Suara pengingat',
    },
    appearanceDefaultSound: {
        en: 'Follows the device default notification sound',
        id: 'Mengikuti suara notifikasi default perangkat',
    },
    appearancePlaying: {
        en: 'Playing preview',
        id: 'Memutar preview',
    },
    appearancePlay: {
        en: 'Play {sound}',
        id: 'Putar {sound}',
    },

    /* ── Settings: About ──────────────────────────────────────────────── */
    aboutTitle: { en: 'About App', id: 'Tentang App' },
    aboutDescription: {
        en: 'App info, updates, and developer support',
        id: 'Info aplikasi, pembaruan, dan dukungan developer',
    },
    aboutAppInfo: { en: 'App info', id: 'Info aplikasi' },
    aboutVersion: { en: 'Version', id: 'Versi App' },
    aboutVersionLabel: { en: 'App version', id: 'Versi aplikasi' },
    aboutDevelopedBy: {
        en: 'Developed by',
        id: 'Dikembangkan oleh',
    },
    aboutUpdate: { en: 'Update', id: 'Pembaruan' },
    aboutCheckingUpdates: {
        en: 'Checking for updates…',
        id: 'Memeriksa pembaruan…',
    },
    aboutUpdateError: {
        en: 'Could not check for updates. Make sure your internet connection is active.',
        id: 'Tidak dapat memeriksa pembaruan. Pastikan koneksi internetmu aktif.',
    },
    aboutUpdateAvailable: {
        en: 'Update available',
        id: 'Update tersedia',
    },
    aboutUpdateVersionHelp: {
        en: 'A newer version is available. You are using version',
        id: 'sudah tersedia. Kamu menggunakan versi',
    },
    aboutUpdateButton: {
        en: 'Update App',
        id: 'Update Aplikasi',
    },
    aboutUpToDate: {
        en: 'Already up to date',
        id: 'Sudah versi terbaru',
    },
    aboutCurrentVersion: {
        en: 'You are using version',
        id: 'Kamu menggunakan versi',
    },
    aboutCheckUpdates: {
        en: 'Check for updates',
        id: 'Periksa Update',
    },
    aboutLastChecked: {
        en: 'Last checked',
        id: 'Terakhir diperiksa',
    },
    aboutChangelog: { en: 'Changelog', id: 'Changelog' },
    aboutViewAllReleases: {
        en: 'View all releases',
        id: 'Lihat semua rilis',
    },
    aboutChangelogEmpty: {
        en: 'Changelog unavailable — update check failed.',
        id: 'Changelog tidak tersedia — periksa pembaruan gagal.',
    },
    aboutChangelogNone: {
        en: 'No changelog for this version.',
        id: 'Belum ada changelog untuk versi ini.',
    },
    aboutSupportDeveloper: {
        en: 'Support the developer',
        id: 'Dukung developer',
    },
    aboutSupportHelp: {
        en: 'Enjoy using the app? Support its development',
        id: 'Suka menggunakan aplikasi? Dukung pengembangan',
    },
    aboutSupportButton: {
        en: 'Support on Saweria',
        id: 'Dukung di Saweria',
    },

    /* ── Dashboard ────────────────────────────────────────────────────── */
    dashGreeting: { en: 'Hello,', id: 'Halo,' },
    dashSubtitle: {
        en: 'What would you like to manage today?',
        id: 'Apa yang mau kamu kelola hari ini?',
    },
    dashTagline: {
        en: 'Manage reminders & savings in one place',
        id: 'Kelola pengingat & tabunganmu di satu tempat',
    },
    dashReminders: { en: 'Reminders', id: 'Ingetin' },
    dashSavings: { en: 'Savings', id: 'Nabung' },
    dashOverdue: { en: 'overdue', id: 'terlewat' },
    dashActiveReminders: {
        en: 'active reminders',
        id: 'Ingetin aktif',
    },
    dashActiveSavings: {
        en: 'active savings goals',
        id: 'Target nabung aktif',
    },
    dashTotalSaved: {
        en: 'Total saved',
        id: 'Total terkumpul',
    },
    dashLastNetto: {
        en: 'Latest net cash',
        id: 'Netto kas terakhir',
    },
    dashNoCashflow: {
        en: 'No cash records yet',
        id: 'Belum ada catatan kas',
    },

    /* ── Personal ─────────────────────────────────────────────────────── */
    personalCashTitle: {
        en: 'Personal Cash',
        id: 'Kas Pribadi',
    },
    personalCashDesc: {
        en: 'Record daily income & expenses',
        id: 'Catat pemasukan & pengeluaran harian',
    },
    personalSavingsTitle: {
        en: 'Savings',
        id: 'Nabung',
    },
    personalSavingsDesc: {
        en: 'Savings goals and installments',
        id: 'Target tabungan dan cicilan',
    },
    personalRemindersTitle: {
        en: 'Reminders',
        id: 'Ingetin',
    },
    personalRemindersDesc: {
        en: 'Task and schedule reminders',
        id: 'Pengingat tugas dan jadwal',
    },
    personalSubtitle: {
        en: 'Manage your personal needs in one place',
        id: 'Kelola kebutuhan personalmu di satu tempat.',
    },
    personalBackToHome: {
        en: 'Back to dashboard',
        id: 'Kembali ke Beranda',
    },

    /* ── Savings ──────────────────────────────────────────────────────── */
    savingsSubtitle: {
        en: 'Track your savings goals and every installment.',
        id: 'Target tabunganmu, pantau progress setiap cicilan.',
    },
    savingsNewTarget: { en: 'New Target', id: 'Target Baru' },
    savingsStatusRunning: { en: 'Running', id: 'Berjalan' },
    savingsStatusAchieved: { en: 'Achieved', id: 'Tercapai' },
    savingsStatusOverdue: { en: 'Overdue', id: 'Terlewat' },
    savingsColCreated: { en: 'Created', id: 'Dibuat' },
    savingsColTarget: { en: 'Target', id: 'Target' },
    savingsColDeadline: { en: 'Deadline', id: 'Batas waktu' },
    savingsColTitle: { en: 'Title', id: 'Judul' },
    savingsEmpty: {
        en: 'No savings goals yet.',
        id: 'Belum ada target nabung yang dibuat.',
    },
    savingsCollect: { en: 'Collect', id: 'Cicil' },
    savingsPerDay: { en: '/day', id: '/hari' },
    savingsPerWeek: { en: '/week', id: '/minggu' },
    savingsPerMonth: { en: '/month', id: '/bulan' },
    savingsOverdueMsg: {
        en: 'Overdue — less to go',
        id: 'Target terlewat — kurang lagi',
    },
    savingsRemainingMsg: {
        en: 'Less to go',
        id: 'Kurang lagi',
    },
    savingsFrom: { en: 'of', id: 'dari' },
    savingsCollected: { en: 'collected', id: 'terkumpul' },
    savingsNewTitle: {
        en: 'New Savings Target',
        id: 'Target Nabung Baru',
    },
    savingsNewTitleHelp: {
        en: 'The title will appear on the progress card.',
        id: 'Judul target akan menjadi judul card progress.',
    },
    savingsTitlePlaceholder: {
        en: 'Target title',
        id: 'Judul target',
    },
    savingsTitleExample: {
        en: 'e.g. Bali Vacation',
        id: 'Contoh: Liburan Bali',
    },
    savingsNominalLabel: {
        en: 'Target amount',
        id: 'Target nominal',
    },
    savingsStartDate: { en: 'Start', id: 'Mulai' },
    savingsEndDate: {
        en: 'End date (optional)',
        id: 'Target selesai (opsional)',
    },
    savingsCreateButton: {
        en: 'Create Target',
        id: 'Buat Target',
    },
    savingsDetailHelp: {
        en: 'Track progress and record installments.',
        id: 'Pantau progress dan catat cicilanmu.',
    },
    savingsTargetLabel: { en: 'Target', id: 'Target' },
    savingsCollectedLabel: { en: 'Saved', id: 'Terkumpul' },
    savingsGoalAchieved: {
        en: 'Target achieved, nice!',
        id: 'Target tercapai, bagus!',
    },
    savingsNeedInstallment: {
        en: 'Needs installment',
        id: 'Butuh cicilan',
    },
    savingsMonthsUntil: { en: '/month until', id: '/bulan sampai' },
    savingsProgressTitle: {
        en: 'Installment Progress',
        id: 'Progress Cicilan',
    },
    savingsTotalSaved: {
        en: 'Total saved',
        id: 'Total terkumpul',
    },
    savingsRecordInstallment: {
        en: 'Record Installment',
        id: 'Catat Cicilan',
    },
    savingsInstallmentFirst: {
        en: 'First installment',
        id: 'Cicilan pertama',
    },
    savingsRecord: { en: 'Record', id: 'Catat' },
    savingsHistoryTitle: {
        en: 'Installment History',
        id: 'Riwayat Cicilan',
    },
    savingsDeleteInstallment: {
        en: 'Delete installment',
        id: 'Hapus cicilan',
    },
    savingsDeleteInstallmentConfirm: {
        en: 'Delete this installment?',
        id: 'Hapus cicilan ini?',
    },
    savingsEditInstallment: {
        en: 'Edit Installment',
        id: 'Edit Cicilan',
    },

    /* ── Cashflows ────────────────────────────────────────────────────── */
    cashflowSubtitle: {
        en: 'Record income & expenses per period.',
        id: 'Catat pemasukan & pengeluaranmu per periode.',
    },
    cashflowNew: { en: 'New Cashflow', id: 'Kas Baru' },
    cashflowEmpty: {
        en: 'No cash records yet.',
        id: 'Belum ada catatan kas.',
    },
    cashflowStartAnytime: {
        en: 'Starts anytime',
        id: 'Mulai kapan saja',
    },
    cashflowIncome: { en: 'Income', id: 'Masuk' },
    cashflowExpense: { en: 'Expense', id: 'Keluar' },
    cashflowPeriodEnd: {
        en: 'Period ends',
        id: 'Periode berakhir',
    },
    cashflowNewTitleHelp: {
        en: 'Title is usually a month or period name.',
        id: 'Judul biasanya nama bulan atau periode.',
    },
    cashflowTitlePlaceholder: {
        en: 'Cashflow title',
        id: 'Judul kas',
    },
    cashflowTitleExample: {
        en: 'e.g. August',
        id: 'Contoh: Bulan Agustus',
    },
    cashflowStartDate: {
        en: 'Start period',
        id: 'Mulai periode',
    },
    cashflowEndDate: {
        en: 'End period (optional)',
        id: 'Akhir periode (opsional)',
    },
    cashflowCreateButton: {
        en: 'Create Cashflow',
        id: 'Buat Kas',
    },

    /* ── Cashflow show ────────────────────────────────────────────────── */
    cashflowIncomeLabel: { en: 'Income', id: 'Pemasukan' },
    cashflowExpenseLabel: { en: 'Expense', id: 'Pengeluaran' },
    cashflowNetto: { en: 'Net', id: 'Netto' },
    cashflowItemName: { en: 'Name', id: 'Nama' },
    cashflowItemNameExample: { en: 'e.g. Salary', id: 'Contoh: Gaji' },
    cashflowItemAmount: { en: 'Amount', id: 'Nominal' },
    cashflowExpenseNameExample: {
        en: 'e.g. Fuel',
        id: 'Contoh: Bensin',
    },
    cashflowItemQuantity: { en: 'Quantity', id: 'Jumlah' },
    cashflowNoItems: {
        en: 'No items yet. Add above.',
        id: 'Belum ada item. Tambahkan di atas.',
    },
    cashflowDeleteItem: { en: 'Delete item', id: 'Hapus item' },
    cashflowDeleteItemConfirm: {
        en: 'Delete this item?',
        id: 'Hapus item ini?',
    },
    cashflowEditItem: { en: 'Edit Item', id: 'Edit Item' },

    /* ── Businesses ───────────────────────────────────────────────────── */
    businessPeriodWeek: { en: 'Weekly', id: 'Mingguan' },
    businessPeriodMonth: { en: 'Monthly', id: 'Bulanan' },
    businessPeriodYear: { en: 'Yearly', id: 'Tahunan' },
    businessSubtitle: {
        en: 'Track cash, expenses, and profit/loss.',
        id: 'Pantau kas, pengeluaran, dan laba/rugi bisnismu.',
    },
    businessNewButton: { en: 'New Business', id: 'Bisnis Baru' },
    businessEmpty: {
        en: 'No business management yet',
        id: 'Belum ada manajemen bisnis',
    },
    businessEmptyHelp: {
        en: 'Create your first business to start tracking daily cash and analyzing profit/loss.',
        id: 'Buat bisnis pertamamu untuk mulai mencatat kas harian dan menganalisis laba/rugi.',
    },
    businessCreateButton: { en: 'Create Business', id: 'Buat Bisnis' },
    businessStart: { en: 'Start', id: 'Mulai' },
    businessRecords: { en: 'records', id: 'catatan' },
    businessDelete: { en: 'Delete business', id: 'Hapus bisnis' },
    businessDeleteConfirm: {
        en: 'Delete this business? All records will be deleted.',
        id: 'Hapus manajemen bisnis ini? Semua catatannya ikut terhapus.',
    },
    businessTypeWeekHelp: {
        en: '7-day rolling from start date',
        id: '7 hari berjalan dari periode mulai',
    },
    businessTypeMonth: { en: 'Month', id: 'Bulan' },
    businessTypeMonthHelp: {
        en: 'Follows calendar month',
        id: 'Mengikuti bulan kalender',
    },
    businessTypeYear: { en: 'Year', id: 'Tahun' },
    businessTypeYearHelp: {
        en: 'Follows calendar year',
        id: 'Mengikuti tahun kalender',
    },
    businessTypeWeek: { en: 'Week', id: 'Minggu' },
    businessTypeFoodSmall: {
        en: 'For small food/drink businesses',
        id: 'Untuk usaha makanan/minuman skala kecil',
    },
    businessTypeFoodLarge: {
        en: 'For food/drink businesses with larger inventory',
        id: 'Untuk usaha makanan/minuman dengan bahan baku lebih besar',
    },
    businessTypeCustom: {
        en: 'Set your own formula percentages',
        id: 'Tentukan sendiri persentase rumusmu',
    },
    businessTypeService: {
        en: 'Service Industry',
        id: 'Industri Jasa',
    },
    businessTypeServiceHelp: {
        en: 'Available in the next update',
        id: 'Tersedia di update berikutnya',
    },
    businessTotalPercentError: {
        en: 'Total formula percentage must be 100% (currently',
        id: 'Total persentase rumus harus 100% (sekarang',
    },
    businessNewTitle: { en: 'New Business', id: 'Bisnis Baru' },
    businessManagement: {
        en: 'Business Management',
        id: 'Manajemen Bisnis',
    },
    businessNewDescription: {
        en: 'Set up your business name, recap period, and formula.',
        id: 'Siapkan nama, periode rekap, dan rumus bisnismu.',
    },
    businessInfoSection: {
        en: 'Business Info',
        id: 'Informasi Bisnis',
    },
    businessNameLabel: {
        en: 'Business Name',
        id: 'Nama Bisnis',
    },
    businessNameExample: {
        en: 'e.g. Warung Nasi Bu Ani',
        id: 'Contoh: Warung Nasi Bu Ani',
    },
    businessRecapPer: {
        en: 'Recap data per?',
        id: 'Rekap data per?',
    },
    businessPeriodStart: {
        en: 'Start date',
        id: 'Periode mulai',
    },
    businessFirstPeriod: {
        en: 'First period:',
        id: 'Periode pertama:',
    },
    businessFormulaSection: {
        en: 'Business Formula',
        id: 'Rumus Bisnis',
    },
    businessFormulaDescription: {
        en: 'Percentage comparison of expenses to revenue, used for profit/loss analysis.',
        id: 'Perbandingan persentase pengeluaran terhadap pendapatan, dipakai untuk analisis laba/rugi.',
    },
    businessFormulaRaw: { en: 'Raw (%)', id: 'Bahan baku (%)' },
    businessFormulaOps: {
        en: 'Operations (%)',
        id: 'Operasional (%)',
    },
    businessFormulaMarketing: {
        en: 'Marketing (%)',
        id: 'Marketing (%)',
    },
    businessFormulaProfit: { en: 'Profit (%)', id: 'Laba (%)' },
    businessFormulaTotal: { en: 'Total:', id: 'Total:' },
    businessFormulaComplete: {
        en: '— already 100%',
        id: '— sudah 100%',
    },
    businessFormulaPercent: {
        en: 'Percentage:',
        id: 'Persentase:',
    },
    businessFormulaRawLabel: { en: 'Raw materials', id: 'Bahan baku' },
    businessFormulaOpsLabel: { en: 'Operations', id: 'Operasional' },
    businessFormulaMarketingLabel: { en: 'Marketing', id: 'Marketing' },
    businessFormulaProfitLabel: { en: 'Profit', id: 'Laba' },

    /* ── Business show ────────────────────────────────────────────────── */
    businessShowManagement: {
        en: 'Business Management',
        id: 'Manajemen Bisnis',
    },
    businessShowRecap: { en: 'Recap', id: 'Rekap' },
    businessShowFormula: { en: 'Formula', id: 'Rumus' },
    businessShowRecapMeta: {
        en: 'Start',
        id: 'Mulai',
    },
    businessShowRecordDaily: {
        en: 'Record Daily',
        id: 'Catat Harian',
    },
    businessShowRecordDailyHelp: {
        en: 'Fill in daily capital, revenue, and small expenses.',
        id: 'Isi modal harian, pendapatan, dan pengeluaran kecilmu hari ini.',
    },
    businessShowBigExpenses: {
        en: 'Big Expenses',
        id: 'Pengeluaran Besar',
    },
    businessShowBigExpensesHelp: {
        en: 'Purchase materials, rent, or other costs anytime.',
        id: 'Belanja material, sewa, atau biaya lain kapan saja.',
    },
    businessShowCashLedger: {
        en: 'Business Cash',
        id: 'Kas Bisnis',
    },
    businessShowCashLedgerHelp: {
        en: 'Running ledger — can only be deleted, not edited.',
        id: 'Buku besar berjalan — hanya bisa dihapus, tidak bisa diedit.',
    },
    businessShowToday: { en: 'Today', id: 'Hari ini' },
    businessShowNoTransactions: {
        en: 'No transactions recorded yet.',
        id: 'Belum ada transaksi tercatat.',
    },
    businessShowCashNew: {
        en: 'Cash opened — opening balance',
        id: 'Kas baru dibuka · saldo awal',
    },
    businessShowClosingBalance: {
        en: 'Closing balance',
        id: 'Saldo akhir kas',
    },
    businessShowCashOpened: {
        en: 'Cash opened',
        id: 'Kas dibuka',
    },
    businessShowCloseTransaction: {
        en: 'Close Transaction',
        id: 'Tutup Transaksi',
    },
    businessShowDeleteTransaction: {
        en: 'Delete transaction',
        id: 'Hapus transaksi',
    },
    businessShowCloseCashflow: {
        en: 'Close Transaction',
        id: 'Tutup Transaksi',
    },
    businessShowCloseCashflowHelp: {
        en: 'Cash will be closed and a new one opened with opening balance',
        id: 'Kas akan ditutup dan kas baru dibuka dengan saldo awal',
    },
    businessShowCloseCashflowButton: {
        en: 'Close Cash',
        id: 'Tutup Kas',
    },
    businessShowInitialCapital: {
        en: 'Initial capital',
        id: 'Modal awal',
    },
    businessShowDailyCapital: {
        en: 'Daily capital',
        id: 'Modal harian',
    },
    businessShowRevenue: { en: 'Revenue', id: 'Pendapatan' },
    businessShowSmallExpenses: {
        en: 'Small expenses',
        id: 'Pengeluaran kecil',
    },
    businessShowBigExpensesLabel: {
        en: 'Big expenses',
        id: 'Pengeluaran besar',
    },
    businessShowOpeningBalance: {
        en: 'Opening cash balance',
        id: 'Saldo awal kas',
    },
    businessShowRawMaterials: { en: 'Raw materials', id: 'Bahan baku' },
    businessShowOperations: { en: 'Operations', id: 'Operasional' },
    businessShowMarketing: { en: 'Marketing', id: 'Marketing' },
    businessShowPreOpsCapital: {
        en: 'Pre-operations capital',
        id: 'Modal pra-operasional',
    },
    businessShowRecord: { en: 'Record', id: 'Catat' },
    businessShowRevenueNameHelp: {
        en: 'Name (e.g. 50 portions)',
        id: 'Nama (mis. 50 porsi)',
    },
    businessShowExpenseType: { en: 'Type', id: 'Jenis' },
    businessShowExpenseTypeBigHelp: {
        en: 'Name (e.g. Weekly raw material purchase)',
        id: 'Nama (mis. Belanja bahan baku seminggu)',
    },
    businessShowExpenseTypeLabel: {
        en: 'Expense type',
        id: 'Jenis pengeluaran',
    },
    businessShowNettoZero: {
        en: 'netto 0 (cash in and out)',
        id: 'netto 0 (keluar masuk kas)',
    },
    businessShowBalanceFlows: {
        en: 'balance flows from previous cash',
        id: 'saldo mengalir dari kas sebelumnya',
    },
    businessShowROI: {
        en: 'Break Even',
        id: 'Balik Modal',
    },
    businessShowROIHelp: {
        en: 'How far profit has covered initial capital',
        id: 'Seberapa jauh laba sudah menutup modal awal',
    },
    businessShowROIComplete: {
        en: 'Already broke even, awesome!',
        id: 'Sudah balik modal, mantap!',
    },
    businessShowROIRemaining: {
        en: 'Less to go',
        id: 'Kurang lagi',
    },
    businessShowLogicLR: {
        en: 'P/L Logic',
        id: 'Logic L/R',
    },
    businessShowPeriodSelect: {
        en: 'Select period',
        id: 'Pilih periode',
    },
    businessShowPeriodCurrent: {
        en: 'Current period',
        id: 'Periode berjalan',
    },
    businessShowTotalExpenses: {
        en: 'Total expenses',
        id: 'Total pengeluaran',
    },
    businessShowRevenueOf: {
        en: '% of revenue',
        id: '% dari pendapatan',
    },
    businessShowProfitLoss: {
        en: 'Profit / Loss',
        id: 'Laba / Rugi',
    },
    businessShowActualProfit: {
        en: 'Actual profit',
        id: 'Laba aktual',
    },
    businessShowTargetProfit: {
        en: 'Target profit',
        id: 'Target laba',
    },
    businessShowInitialCapitalModal: {
        en: 'Initial capital',
        id: 'Modal awal',
    },
    businessShowInitialCapitalHelp: {
        en: 'Money you invest at the start of the business',
        id: 'Uang yang kamu tanamkan di awal bisnis',
    },
    businessShowInitialCapitalHelp2: {
        en: 'Record initial capital to start calculating cash flow',
        id: 'Catat modal awal untuk mulai menghitung arus kas',
    },
    businessShowPreOpsHelp: {
        en: 'Capital already used for initial needs (equipment, permits, etc.) — automatically recorded as an expense so cash balances.',
        id: 'Bagian modal yang sudah dipakai untuk kebutuhan awal (peralatan, izin, dsb.) — otomatis tercatat sebagai pengeluaran supaya kas balance.',
    },
    businessShowCapitalInitial: {
        en: 'Initial Capital',
        id: 'Modal Awal',
    },

    /* ── Reminders ────────────────────────────────────────────────────── */
    remindersSubtitle: {
        en: 'Reminders will appear as notifications.',
        id: 'Pengingat akan muncul sebagai notifikasi.',
    },
    remindersAdd: { en: 'Add', id: 'Tambah' },
    remindersStatusActive: { en: 'Active', id: 'Aktif' },
    remindersStatusDone: { en: 'Done', id: 'Selesai' },
    remindersStatusOverdue: { en: 'Overdue', id: 'Terlewat' },
    remindersColTime: { en: 'Time', id: 'Waktu' },
    remindersColCreated: { en: 'Created', id: 'Dibuat' },
    remindersColTitle: { en: 'Title', id: 'Judul' },
    remindersColDone: { en: 'Done', id: 'Selesai' },
    remindersEmpty: {
        en: 'No reminders yet.',
        id: 'Belum ada pengingat.',
    },
    remindersNewTitle: { en: 'Add Reminder', id: 'Tambah Ingetin' },
    remindersNewHelp: {
        en: 'Create a new reminder.',
        id: 'Buat pengingat baru.',
    },
    remindersEditTitle: {
        en: 'Edit Reminder',
        id: 'Ubah Ingetin',
    },
    remindersEditHelp: {
        en: 'Update reminder details.',
        id: 'Perbarui detail pengingat.',
    },
    remindersMarkDone: { en: 'Done', id: 'Selesai' },
    remindersMarkDoneAction: { en: 'Mark done', id: 'Tandai selesai' },
    remindersOverduePrefix: { en: 'Overdue •', id: 'Terlewat •' },
    remindersDelete: { en: 'Delete reminder', id: 'Hapus ingetin' },
    remindersDeleteConfirm: {
        en: 'Delete reminder',
        id: 'Hapus ingetin',
    },
    remindersTitlePlaceholder: {
        en: 'e.g. Take medicine',
        id: 'Contoh: Minum obat',
    },
    remindersWhen: { en: 'When', id: 'Kapan' },
    remindersSave: { en: 'Save', id: 'Simpan' },
    remindersSubmit: { en: 'Add', id: 'Tambah' },

    /* ── Welcome page ─────────────────────────────────────────────────── */
    welcomeAppName: { en: 'Ingetin', id: 'Ingetin' },
    welcomeTagline1: {
        en: 'Timely notifications.',
        id: 'Pengingat yang muncul sebagai notifikasi tepat waktu.',
    },
    welcomeSavings: { en: 'Savings', id: 'Nabung' },
    welcomeSavingsTagline: {
        en: 'Savings goals with progress and installment tips.',
        id: 'Target tabungan dengan progress dan saran cicilan.',
    },
    welcomeDashboard: { en: 'Dashboard', id: 'Beranda' },
    welcomeOpenDashboard: {
        en: 'Open dashboard',
        id: 'Buka dashboard',
    },
    welcomeSignIn: { en: 'Sign in', id: 'Masuk' },
    welcomeSignUp: { en: 'Sign up', id: 'Daftar' },
    welcomeHeroTitle: {
        en: 'Manage your life, more calmly',
        id: 'Kelola hidupmu, lebih tenang',
    },
    welcomeHeroLife: { en: 'Life', id: 'Hidup' },
    welcomeHeroOrganized: {
        en: 'more organized',
        id: 'lebih teratur',
    },
    welcomeHeroDescription: {
        en: 'Reminders and savings targets in one app. Track progress, plan installments, and never miss important moments.',
        id: 'Ingetin pengingat waktu dan tabungan target dalam satu aplikasi. Pantau progress, sisihkan cicilan, dan jangan lewatkan momen penting.',
    },
    welcomeCTA: { en: 'Get Started Free', id: 'Mulai Gratis' },

    /* ── Auth pages ──────────────────────────────────────────────────── */
    authName: { en: 'Name', id: 'Nama' },
    authEmail: { en: 'Email address', id: 'Alamat email' },
    authPassword: { en: 'Password', id: 'Kata sandi' },
    authConfirmPassword: {
        en: 'Confirm password',
        id: 'Konfirmasi kata sandi',
    },
    authRemember: { en: 'Remember me', id: 'Ingat saya' },
    authForgotPassword: {
        en: 'Forgot your password?',
        id: 'Lupa kata sandi?',
    },
    authLogin: { en: 'Log in', id: 'Masuk' },
    authLoginTitle: { en: 'Log in', id: 'Masuk' },
    authRegister: { en: 'Register', id: 'Daftar' },
    authRegisterTitle: { en: 'Create account', id: 'Daftar' },
    authForgotTitle: {
        en: 'Forgot your password?',
        id: 'Lupa kata sandi?',
    },
    authSendResetLink: {
        en: 'Email password reset link',
        id: 'Kirim tautan pengaturan kata sandi',
    },
    authBackToLogin: {
        en: 'Back to log in',
        id: 'Kembali ke masuk',
    },
    authResetPassword: {
        en: 'Reset Password',
        id: 'Atur Ulang Kata Sandi',
    },
    authVerifyTitle: {
        en: 'Email verification',
        id: 'Verifikasi email',
    },
    authVerifyDescription: {
        en: 'Please verify your email address by clicking on the link we just emailed to you.',
        id: 'Silakan verifikasi alamat emailmu dengan mengeklik tautan yang baru saja kami kirim.',
    },
    authVerifySent: {
        en: 'A new verification link has been sent to your email address.',
        id: 'Tautan verifikasi baru telah dikirim ke alamat emailmu.',
    },
    authResendVerification: {
        en: 'Resend verification email',
        id: 'Kirim ulang email verifikasi',
    },
    authLogout: { en: 'Log out', id: 'Keluar' },

    /* ── Error boundary ───────────────────────────────────────────────── */
    errorTitle: { en: 'ERROR IN', id: 'ERROR DI' },
    errorRetry: { en: 'Close (try again)', id: 'Tutup (coba lagi)' },

    /* ── Splash ───────────────────────────────────────────────────────── */
    splashLoading: { en: 'Loading', id: 'Memuat' },
    splashVersion: { en: 'Version', id: 'Versi' },
    splashAdjusting: {
        en: 'Adjusting assets…',
        id: 'Menyesuaikan aset…',
    },
    splashAssetCheck: {
        en: 'Asset check unavailable',
        id: 'Cek aset tidak tersedia',
    },

    /* ── Notification lib ─────────────────────────────────────────────── */
    notifChannelName: { en: 'Ingetin', id: 'Ingetin' },
    notifChannelDescription: {
        en: 'Reminder notifications',
        id: 'Notifikasi pengingat',
    },
    notifDefaultSound: {
        en: 'Default (system)',
        id: 'Default (sistem)',
    },
    notifPlay: { en: 'Play', id: 'Putar' },

    /* ── Filter bar ───────────────────────────────────────────────────── */
    filterStatus: { en: 'Status', id: 'Status' },
    filterOrder: { en: 'Sort by', id: 'Urutan' },
} as const;

/* -------------------------------------------------------------------------- */
/*  React hook + store                                                        */
/* -------------------------------------------------------------------------- */

export type TranslationKey = keyof typeof translations;

type TranslationValue = (typeof translations)[TranslationKey];

const listeners = new Set<() => void>();

const STORAGE_KEY = 'lifeman.lang';

let currentLang: Language = 'en';

function getStoredLanguage(): Language {
    if (typeof window === 'undefined') {
        return 'en';
    }

    return window.localStorage.getItem(STORAGE_KEY) === 'id' ? 'id' : 'en';
}

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

export function initializeLanguage(): void {
    if (typeof window === 'undefined') {
        return;
    }

    currentLang = getStoredLanguage();
    document.documentElement.lang = currentLang;
}

export type UseI18nReturn = {
    readonly lang: Language;
    readonly t: (key: TranslationKey) => string;
    readonly setLang: (next: Language) => void;
};

export function useI18n(): UseI18nReturn {
    const lang: Language = useSyncExternalStore(
        subscribe,
        () => currentLang,
        () => 'en',
    );

    const t = (key: TranslationKey): string => {
        const value: TranslationValue = translations[key];

        return value[lang] ?? value.en;
    };

    const setLang = (next: Language): void => {
        currentLang = next;

        try {
            window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // ignore storage failures
        }

        document.documentElement.lang = next;
        notify();
    };

    return { lang, t, setLang } as const;
}

/* Light, non-hook accessor for class components (e.g. error boundary). */

export function getT(): (key: TranslationKey) => string {
    return (key: TranslationKey): string =>
        translations[key][currentLang] ?? translations[key].en;
}
