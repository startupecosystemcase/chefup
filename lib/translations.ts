export type Language = 'RU' | 'KZ' | 'EN'

export interface Translations {
  menu: {
    home: string
    team: string
    practice: string
    certificates: string
    community: string
    jobs: string
    resumes: string
    partners: string
    education: string
    hrSystem: string
    settings: string
    myProfile: string
    myResume: string
    subscription: string
    myResponses: string
    personalCabinet: string
  }
  admin: {
    workers: string
    companies: string
    vacancies: string
    events: string
    practice: string
    community: string
    statistics: string
    settings: string
    promo: string
    promoAnalytics: string
    moderateJobs: string
    moderateCandidates: string
    moderateProfiles: string
    moderateEducation: string
    moderateEvents: string
    manageUsers: string
  }
  buttons: {
    save: string
    cancel: string
    delete: string
    add: string
    edit: string
    back: string
    forward: string
    search: string
    filter: string
    close: string
    submit: string
    create: string
    update: string
    remove: string
    accept: string
    reject: string
    markAllRead: string
    goToProfile: string
    contactViaWhatsApp: string
    toHome: string
    logout: string
  }
  common: {
    profile: string
    companyProfile: string
    myProfile: string
    settings: string
    notifications: string
    search: string
    filters: string
    searchAndFilters: string
    all: string
    vacancies: string
    events: string
    programs: string
    vacanciesForYou: string
    upcomingEvents: string
    popularPrograms: string
    editProfile: string
    editLogin: string
    statistics: string
    createVacancy: string
    viewCurrentVacancies: string
    addVacancy: string
    addEvent: string
    addEducation: string
    addParticipant: string
    addCertificate: string
    addMember: string
    editQuestionnaire: string
    fillQuestionnaire: string
    editAbout: string
    editContacts: string
    editGoals: string
    editExperience: string
    editEducation: string
    editSpecialization: string
    editPreferences: string
    editSocials: string
    vacanciesOnModeration: string
    noVacanciesFound: string
    noEventsFound: string
    noEducationFound: string
    noPartnersFound: string
    noResultsFound: string
    submitting: string
    saved: string
    deleted: string
    added: string
    updated: string
    profileApproved: string
    profileRejected: string
    somethingWentWrong: string
    pageNotFound: string
  }
  roles: {
    applicant: string
    employer: string
    moderator: string
    chef: string
  }
}

const translations: Record<Language, Translations> = {
  RU: {
    menu: {
      home: 'Главная',
      team: 'Команда',
      practice: 'Практика',
      certificates: 'Сертификаты',
      community: 'Коммьюнити',
      jobs: 'Вакансии',
      resumes: 'Сообщество',
      partners: 'Партнёры',
      education: 'Образование',
      hrSystem: 'HR-система',
      settings: 'Настройки',
      myProfile: 'Мой профиль',
      myResume: 'Моё резюме',
      subscription: 'Подписка',
      myResponses: 'Мои отклики',
      personalCabinet: 'Личный кабинет',
    },
    admin: {
      workers: 'Работники',
      companies: 'Компании',
      vacancies: 'Вакансии',
      events: 'Мероприятия',
      practice: 'Практика',
      community: 'Сообщество',
      statistics: 'Статистика',
      settings: 'Настройки',
      promo: 'Промокоды',
      promoAnalytics: 'Аналитика промокодов',
      moderateJobs: 'Проверка вакансий',
      moderateCandidates: 'Автоподбор кандидатов',
      moderateProfiles: 'Модерация профилей',
      moderateEducation: 'Модерация образования',
      moderateEvents: 'Модерация событий',
      manageUsers: 'Управление пользователями',
    },
    buttons: {
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      add: 'Добавить',
      edit: 'Редактировать',
      back: 'Назад',
      forward: 'Вперёд',
      search: 'Поиск',
      filter: 'Фильтр',
      close: 'Закрыть',
      submit: 'Отправить',
      create: 'Создать',
      update: 'Обновить',
      remove: 'Удалить',
      accept: 'Принять',
      reject: 'Отклонить',
      markAllRead: 'Отметить все как прочитанное',
      goToProfile: 'Перейти в мой профиль',
      contactViaWhatsApp: 'Связаться через WhatsApp',
      toHome: 'На главную',
      logout: 'Выйти',
    },
    common: {
      profile: 'Профиль',
      companyProfile: 'Профиль компании',
      myProfile: 'Мой профиль',
      settings: 'Настройки',
      notifications: 'Уведомления',
      search: 'Поиск',
      filters: 'Фильтры',
      searchAndFilters: 'Поиск и фильтры',
      all: 'Все',
      vacancies: 'Вакансии',
      events: 'Мероприятия',
      programs: 'Программы',
      vacanciesForYou: 'Вакансии для вас',
      upcomingEvents: 'Предстоящие мероприятия',
      popularPrograms: 'Популярные программы',
      editProfile: 'Редактировать профиль',
      editLogin: 'Редактировать логин',
      statistics: 'Статистика',
      createVacancy: 'Создать вакансию',
      viewCurrentVacancies: 'Просмотр текущих вакансий',
      addVacancy: 'Добавить вакансию',
      addEvent: 'Добавить мероприятие',
      addEducation: 'Добавить обучение',
      addParticipant: 'Добавить участника',
      addCertificate: 'Добавить сертификат',
      addMember: 'Добавить участника',
      editQuestionnaire: 'Редактировать анкету',
      fillQuestionnaire: 'Заполнить анкету',
      editAbout: 'Редактировать "О себе"',
      editContacts: 'Редактировать контакты',
      editGoals: 'Редактировать цели и интересы',
      editExperience: 'Редактировать опыт работы',
      editEducation: 'Редактировать образование',
      editSpecialization: 'Редактировать специализацию',
      editPreferences: 'Редактировать предпочтения',
      editSocials: 'Редактировать соцсети',
      vacanciesOnModeration: 'Вакансии на модерации',
      noVacanciesFound: 'Вакансии не найдены',
      noEventsFound: 'Мероприятия не найдены',
      noEducationFound: 'Обучение не найдено',
      noPartnersFound: 'Партнёры не найдены',
      noResultsFound: 'Результаты не найдены',
      submitting: 'Отправка...',
      saved: 'Сохранено',
      deleted: 'Удалено',
      added: 'Добавлено',
      updated: 'Обновлено',
      profileApproved: 'Профиль одобрен',
      profileRejected: 'Профиль отклонен',
      somethingWentWrong: 'Что-то пошло не так',
      pageNotFound: 'Страница не найдена',
    },
    roles: {
      applicant: 'Шеф-повар',
      employer: 'Работодатель',
      moderator: 'Модератор',
      chef: 'Шеф-повар',
    },
  },
  KZ: {
    menu: {
      home: 'Басты',
      team: 'Команда',
      practice: 'Практика',
      certificates: 'Сертификаттар',
      community: 'Қауымдастық',
      jobs: 'Жұмыс орындары',
      resumes: 'Қоғамдастық',
      partners: 'Серіктестер',
      education: 'Білім беру',
      hrSystem: 'HR-жүйе',
      settings: 'Баптаулар',
      myProfile: 'Менің профилім',
      myResume: 'Менің резюмем',
      subscription: 'Жазылым',
      myResponses: 'Менің жауаптарым',
      personalCabinet: 'Жеке кабинет',
    },
    admin: {
      workers: 'Жұмысшылар',
      companies: 'Компаниялар',
      vacancies: 'Жұмыс орындары',
      events: 'Іс-шаралар',
      practice: 'Практика',
      community: 'Қауымдастық',
      statistics: 'Статистика',
      settings: 'Баптаулар',
      promo: 'Промокодтар',
      promoAnalytics: 'Промокодтар аналитикасы',
      moderateJobs: 'Жұмыс орындарын тексеру',
      moderateCandidates: 'Кандидаттарды автоматты таңдау',
      moderateProfiles: 'Профильдерді модерировать',
      moderateEducation: 'Білім беруді модерировать',
      moderateEvents: 'Іс-шараларды модерировать',
      manageUsers: 'Пайдаланушыларды басқару',
    },
    buttons: {
      save: 'Сақтау',
      cancel: 'Болдырмау',
      delete: 'Жою',
      add: 'Қосу',
      edit: 'Өңдеу',
      back: 'Артқа',
      forward: 'Алға',
      search: 'Іздеу',
      filter: 'Сүзгі',
      close: 'Жабу',
      submit: 'Жіберу',
      create: 'Жасау',
      update: 'Жаңарту',
      remove: 'Жою',
      accept: 'Қабылдау',
      reject: 'Қабылдамау',
      markAllRead: 'Барлығын оқылған деп белгілеу',
      goToProfile: 'Менің профиліме өту',
      contactViaWhatsApp: 'WhatsApp арқылы байланысу',
      toHome: 'Басты бетке',
      logout: 'Шығу',
    },
    common: {
      profile: 'Профиль',
      companyProfile: 'Компания профилі',
      myProfile: 'Менің профилім',
      settings: 'Баптаулар',
      notifications: 'Хабарландырулар',
      search: 'Іздеу',
      filters: 'Сүзгілер',
      searchAndFilters: 'Іздеу және сүзгілер',
      all: 'Барлығы',
      vacancies: 'Жұмыс орындары',
      events: 'Іс-шаралар',
      programs: 'Бағдарламалар',
      vacanciesForYou: 'Сізге арналған жұмыс орындары',
      upcomingEvents: 'Алдағы іс-шаралар',
      popularPrograms: 'Танымал бағдарламалар',
      editProfile: 'Профильді өңдеу',
      editLogin: 'Логинді өңдеу',
      statistics: 'Статистика',
      createVacancy: 'Жұмыс орынын жасау',
      viewCurrentVacancies: 'Ағымдағы жұмыс орындарын көру',
      addVacancy: 'Жұмыс орынын қосу',
      addEvent: 'Іс-шара қосу',
      addEducation: 'Оқыту қосу',
      addParticipant: 'Қатысушы қосу',
      addCertificate: 'Сертификат қосу',
      addMember: 'Мүшені қосу',
      editQuestionnaire: 'Анкетаны өңдеу',
      fillQuestionnaire: 'Анкетаны толтыру',
      editAbout: '"Өзім туралы" өңдеу',
      editContacts: 'Байланыстарды өңдеу',
      editGoals: 'Мақсаттар мен қызығушылықтарды өңдеу',
      editExperience: 'Жұмыс тәжірибесін өңдеу',
      editEducation: 'Білім беруді өңдеу',
      editSpecialization: 'Мамандануды өңдеу',
      editPreferences: 'Басымдықтарды өңдеу',
      editSocials: 'Әлеуметтік желілерді өңдеу',
      vacanciesOnModeration: 'Модерациядағы жұмыс орындары',
      noVacanciesFound: 'Жұмыс орындары табылмады',
      noEventsFound: 'Іс-шаралар табылмады',
      noEducationFound: 'Оқыту табылмады',
      noPartnersFound: 'Серіктестер табылмады',
      noResultsFound: 'Нәтижелер табылмады',
      submitting: 'Жіберілуде...',
      saved: 'Сақталды',
      deleted: 'Жойылды',
      added: 'Қосылды',
      updated: 'Жаңартылды',
      profileApproved: 'Профиль мақұлданды',
      profileRejected: 'Профиль қабылданбады',
      somethingWentWrong: 'Бір нәрсе дұрыс болмады',
      pageNotFound: 'Бет табылмады',
    },
    roles: {
      applicant: 'Аспазбасы',
      employer: 'Жұмыс беруші',
      moderator: 'Модератор',
      chef: 'Аспазбасы',
    },
  },
  EN: {
    menu: {
      home: 'Home',
      team: 'Team',
      practice: 'Practice',
      certificates: 'Certificates',
      community: 'Community',
      jobs: 'Jobs',
      resumes: 'Community',
      partners: 'Partners',
      education: 'Education',
      hrSystem: 'HR System',
      settings: 'Settings',
      myProfile: 'My Profile',
      myResume: 'My Resume',
      subscription: 'Subscription',
      myResponses: 'My Responses',
      personalCabinet: 'Personal Cabinet',
    },
    admin: {
      workers: 'Workers',
      companies: 'Companies',
      vacancies: 'Vacancies',
      events: 'Events',
      practice: 'Practice',
      community: 'Community',
      statistics: 'Statistics',
      settings: 'Settings',
      promo: 'Promo Codes',
      promoAnalytics: 'Promo Analytics',
      moderateJobs: 'Moderate Jobs',
      moderateCandidates: 'Auto-select Candidates',
      moderateProfiles: 'Moderate Profiles',
      moderateEducation: 'Moderate Education',
      moderateEvents: 'Moderate Events',
      manageUsers: 'Manage Users',
    },
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      add: 'Add',
      edit: 'Edit',
      back: 'Back',
      forward: 'Forward',
      search: 'Search',
      filter: 'Filter',
      close: 'Close',
      submit: 'Submit',
      create: 'Create',
      update: 'Update',
      remove: 'Remove',
      accept: 'Accept',
      reject: 'Reject',
      markAllRead: 'Mark all as read',
      goToProfile: 'Go to my profile',
      contactViaWhatsApp: 'Contact via WhatsApp',
      toHome: 'To Home',
      logout: 'Logout',
    },
    common: {
      profile: 'Profile',
      companyProfile: 'Company Profile',
      myProfile: 'My Profile',
      settings: 'Settings',
      notifications: 'Notifications',
      search: 'Search',
      filters: 'Filters',
      searchAndFilters: 'Search and Filters',
      all: 'All',
      vacancies: 'Vacancies',
      events: 'Events',
      programs: 'Programs',
      vacanciesForYou: 'Vacancies for you',
      upcomingEvents: 'Upcoming events',
      popularPrograms: 'Popular programs',
      editProfile: 'Edit Profile',
      editLogin: 'Edit Login',
      statistics: 'Statistics',
      createVacancy: 'Create Vacancy',
      viewCurrentVacancies: 'View Current Vacancies',
      addVacancy: 'Add Vacancy',
      addEvent: 'Add Event',
      addEducation: 'Add Education',
      addParticipant: 'Add Participant',
      addCertificate: 'Add Certificate',
      addMember: 'Add Member',
      editQuestionnaire: 'Edit Questionnaire',
      fillQuestionnaire: 'Fill Questionnaire',
      editAbout: 'Edit About',
      editContacts: 'Edit Contacts',
      editGoals: 'Edit Goals and Interests',
      editExperience: 'Edit Experience',
      editEducation: 'Edit Education',
      editSpecialization: 'Edit Specialization',
      editPreferences: 'Edit Preferences',
      editSocials: 'Edit Socials',
      vacanciesOnModeration: 'Vacancies on Moderation',
      noVacanciesFound: 'No vacancies found',
      noEventsFound: 'No events found',
      noEducationFound: 'No education found',
      noPartnersFound: 'No partners found',
      noResultsFound: 'No results found',
      submitting: 'Submitting...',
      saved: 'Saved',
      deleted: 'Deleted',
      added: 'Added',
      updated: 'Updated',
      profileApproved: 'Profile approved',
      profileRejected: 'Profile rejected',
      somethingWentWrong: 'Something went wrong',
      pageNotFound: 'Page not found',
    },
    roles: {
      applicant: 'Chef',
      employer: 'Employer',
      moderator: 'Moderator',
      chef: 'Chef',
    },
  },
}

export function getTranslations(language: Language): Translations {
  return translations[language] || translations.RU
}

