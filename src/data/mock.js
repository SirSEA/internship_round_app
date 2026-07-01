export const user = {
  id: 1,
  name: "Amara Okafor",
  email: "amara@lifecircle.app",
  avatar: "AO",
  joinDate: "Jan 2025",
  location: "Lagos, Nigeria",
  bio: "Building bridges across communities.",
  familyName: "Okafor",
  house: "Nnenne",
  village: "Umuahia",
  clan: "Okafor",
  lineageId: 1,
  stats: {
    connections: 248,
    communities: 12,
    events: 8,
    contributions: "₦245,000",
  },
  savings: {
    dailyBalance: 45000,
    monthlyBalance: 120000,
    rotationalBalance: 200000,
    goalBalance: 50000,
    totalSaved: 415000,
  },
  investments: {
    totalInvested: 750000,
    totalReturns: 89200,
    activeInvestments: 3,
  },
};

export const communities = [
  { id: 1, name: "St. Mary's Church", type: "Church", members: 342, color: "bg-green-700", banner: "from-green-800 to-green-600", description: "A vibrant faith community serving Lagos since 1985." },
  { id: 2, name: "Al-Noor Mosque", type: "Mosque", members: 256, color: "bg-green-600", banner: "from-emerald-800 to-emerald-600", description: "Islamic center promoting peace and community development." },
  { id: 3, name: "Sunrise Neighborhood", type: "Neighborhood", members: 189, color: "bg-green-500", banner: "from-green-600 to-green-400", description: "Residential community in the heart of Victoria Island." },
  { id: 4, name: "Unity High School '12", type: "School", members: 467, color: "bg-emerald-700", banner: "from-emerald-800 to-teal-600", description: "Class of 2012 reunion and alumni association." },
  { id: 5, name: "Okafor Family Circle", type: "Family", members: 89, color: "bg-green-800", banner: "from-green-900 to-green-700", description: "The Okafor clan — extended family network." },
  { id: 6, name: "Tech Founders Guild", type: "Professional", members: 156, color: "bg-emerald-600", banner: "from-emerald-700 to-cyan-600", description: "A guild of tech founders building the future of Africa." },
  { id: 7, name: "Okafor Nnenne Family", type: "Family", members: 24, color: "bg-amber-700", banner: "from-amber-800 to-amber-600", description: "The Nnenne house of the Okafor clan — direct lineage of our ancestors." },
  { id: 8, name: "Umuahia Development Union", type: "Village", members: 312, color: "bg-teal-700", banner: "from-teal-800 to-teal-600", description: "Sons and daughters of Umuahia promoting community development." },
  { id: 9, name: "Nwosu Clan Association", type: "Clan", members: 178, color: "bg-indigo-700", banner: "from-indigo-800 to-indigo-600", description: "The Nwosu clan network — preserving heritage and fostering connections." },
  { id: 10, name: "Nnewi Indigenes", type: "Village", members: 245, color: "bg-rose-700", banner: "from-rose-800 to-rose-600", description: "Nnewi hometown association connecting indigenes worldwide." },
  { id: 11, name: "Okafor Clan Heritage", type: "Clan", members: 156, color: "bg-purple-700", banner: "from-purple-800 to-purple-600", description: "Preserving Okafor clan history, lineage, and cultural heritage." },
  { id: 12, name: "Eze Royal Lineage", type: "Family", members: 67, color: "bg-yellow-700", banner: "from-yellow-800 to-yellow-600", description: "The royal Eze family — custodians of tradition." },
];

export const categoryIcons = {
  Church: "⛪",
  Mosque: "🕌",
  Neighborhood: "🏘️",
  School: "🎓",
  Family: "👨‍👩‍👧‍👦",
  Professional: "💼",
  Village: "🌍",
  Clan: "🔗",
};

export const enrichedCommunities = communities.map((c) => {
  const memberNames = [];
  for (let i = 1; i <= Math.min(c.members, 20); i++) {
    const names = ["Chioma Eze", "Emeka Nwosu", "Adebayo Johnson", "Funke Adeleke", "Tunde Bakare", "Ngozi Okonkwo", "Kelechi Okafor", "Zainab Abdullah", "Chidi Obi", "Yetunde Alabi", "Musa Danjuma", "Amina Suleiman", "Femi Adekunle", "Grace Eze", "Ifeanyi Okafor", "Blessing Uche", "Segun Ogunleye", "Titi Akinlade", "Michael Opara", "Sarah Bello"];
    memberNames.push(names[i % names.length]);
  }
  return {
    ...c,
    description: c.description,
    officers: [
      { role: "President", name: memberNames[0] },
      { role: "Secretary", name: memberNames[1] },
      { role: "Treasurer", name: memberNames[2] },
    ],
    members: memberNames.map((name, idx) => ({
      id: idx + 1,
      name,
      role: idx < 3 ? ["President", "Secretary", "Treasurer"][idx] : "Member",
      joinDate: `202${idx % 5 + 1}-0${(idx % 9) + 1}-15`,
      contributions: `${(idx + 1) * 5000}`,
      avatar: name.split(" ").map((n) => n[0]).join(""),
    })),
    fundAccounts: [
      { id: "dues", label: "Membership Dues", balance: 450000, goal: 1000000, dueDate: "Monthly", contributors: c.members },
      { id: "levies", label: "Levies", balance: 280000, goal: 500000, dueDate: "Quarterly", contributors: Math.floor(c.members * 0.6) },
      { id: "welfare", label: "Welfare Contribution", balance: 620000, goal: 1000000, dueDate: "Monthly", contributors: Math.floor(c.members * 0.8) },
      { id: "emergency", label: "Emergency Fund", balance: 890000, goal: 2000000, dueDate: "As needed", contributors: Math.floor(c.members * 0.9) },
      { id: "development", label: "Development Fund", balance: 1200000, goal: 5000000, dueDate: "Quarterly", contributors: Math.floor(c.members * 0.5) },
      { id: "scholarship", label: "Scholarship Fund", balance: 350000, goal: 3000000, dueDate: "Annual", contributors: Math.floor(c.members * 0.4) },
      { id: "building", label: "Building Project", balance: 2500000, goal: 15000000, dueDate: "Monthly", contributors: Math.floor(c.members * 0.7) },
    ],
    transactions: [
      { id: 1, type: "credit", description: "Membership dues collection", amount: 150000, date: "2026-06-15", status: "completed", by: "Chioma Eze" },
      { id: 2, type: "credit", description: "Welfare contribution (June)", amount: 85000, date: "2026-06-14", status: "completed", by: "Emeka Nwosu" },
      { id: 3, type: "debit", description: "Emergency fund disbursement", amount: 200000, date: "2026-06-12", status: "completed", by: "Adebayo Johnson" },
      { id: 4, type: "credit", description: "Building project contribution", amount: 310000, date: "2026-06-10", status: "completed", by: "Funke Adeleke" },
      { id: 5, type: "credit", description: "Scholarship fund donation", amount: 50000, date: "2026-06-08", status: "pending", by: "Tunde Bakare" },
      { id: 6, type: "debit", description: "Development fund allocation", amount: 400000, date: "2026-06-05", status: "completed", by: "Ngozi Okonkwo" },
    ],
    announcements: [
      { id: 1, title: "Quarterly General Meeting", content: "Please join us for our quarterly general meeting on July 20th at 10 AM. All members are expected to attend.", date: "2026-06-18", author: "Chioma Eze", priority: "high" },
      { id: 2, title: "Building Project Update", content: "We've reached 25% of our building fund goal! Thank you to everyone who has contributed.", date: "2026-06-15", author: "Emeka Nwosu", priority: "medium" },
      { id: 3, title: "New Membership Drive", content: "We're launching a membership drive this July. Refer a friend and both get a discount on annual dues!", date: "2026-06-10", author: "Adebayo Johnson", priority: "low" },
    ],
    forumPosts: [
      { id: 1, title: "Ideas for community development project", author: "Chioma Eze", replies: 12, date: "2026-06-17", lastActive: "2h ago", content: "I think we should focus on education initiatives this year..." },
      { id: 2, title: "Scholarship application process", author: "Emeka Nwosu", replies: 8, date: "2026-06-14", lastActive: "1d ago", content: "The scholarship committee has released guidelines for 2026 applications..." },
      { id: 3, title: "Building project — architect recommendations", author: "Funke Adeleke", replies: 15, date: "2026-06-10", lastActive: "3h ago", content: "Does anyone have recommendations for an architect who can work with our budget?" },
      { id: 4, title: "Welcome new members!", author: "Adebayo Johnson", replies: 24, date: "2026-06-05", lastActive: "5h ago", content: "Let's give a warm welcome to our newest members who joined this month..." },
    ],
    gallery: [
      { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", caption: "Annual Community Festival 2026", date: "2026-06-01", uploadedBy: "Chioma Eze" },
      { id: 2, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800", caption: "Youth Workshop Session", date: "2026-05-20", uploadedBy: "Emeka Nwosu" },
      { id: 3, url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800", caption: "Fundraising Gala Night", date: "2026-05-10", uploadedBy: "Funke Adeleke" },
      { id: 4, url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800", caption: "Community Clean-Up Exercise", date: "2026-04-28", uploadedBy: "Tunde Bakare" },
      { id: 5, url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800", caption: "Scholarship Award Ceremony", date: "2026-04-15", uploadedBy: "Ngozi Okonkwo" },
      { id: 6, url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800", caption: "Building Project Groundbreaking", date: "2026-04-01", uploadedBy: "Adebayo Johnson" },
    ],
    events: [
      { id: 1, title: "Community Harvest Festival", date: "Jul 15, 2026", time: "10:00 AM", location: "Parish Hall", attendees: 78, category: "Festival" },
      { id: 2, title: "Youth Mentorship Workshop", date: "Jul 22, 2026", time: "2:00 PM", location: "Community Center", attendees: 45, category: "Workshop" },
      { id: 3, title: "Quarterly General Meeting", date: "Jul 20, 2026", time: "10:00 AM", location: "Main Hall", attendees: 120, category: "Meeting" },
      { id: 4, title: "Building Project Fundraiser", date: "Aug 2, 2026", time: "4:00 PM", location: "Virtual (Zoom)", attendees: 60, category: "Fundraiser" },
    ],
    commerce: [
      { id: 1, name: "Chioma's Catering", owner: "Chioma Eze", category: "Food & Beverage", description: "Catering services for all events", phone: "+234 801 234 5678", rating: 4.8 },
      { id: 2, name: "Emeka Tech Solutions", owner: "Emeka Nwosu", category: "Technology", description: "IT consulting and software development", phone: "+234 802 345 6789", rating: 4.6 },
      { id: 3, name: "Adebayo Realty", owner: "Adebayo Johnson", category: "Real Estate", description: "Property sales and management", phone: "+234 803 456 7890", rating: 4.7 },
      { id: 4, name: "Funke's Fashion House", owner: "Funke Adeleke", category: "Fashion", description: "Bespoke tailoring and fashion design", phone: "+234 804 567 8901", rating: 4.9 },
      { id: 5, name: "Tunde Auto Services", owner: "Tunde Bakare", category: "Automotive", description: "Car repairs and maintenance", phone: "+234 805 678 9012", rating: 4.5 },
    ],
    savingsPlans: [
      { id: 1, name: "Daily Savings", type: "daily", balance: 45000, goal: 100000, contributed: 45, members: 34, nextDue: "2026-06-22", rate: "₦1,000/day" },
      { id: 2, name: "Monthly Contribution", type: "monthly", balance: 120000, goal: 500000, contributed: 67, members: 56, nextDue: "2026-07-01", rate: "₦5,000/month" },
      { id: 3, name: "Rotational Contribution", type: "rotational", balance: 200000, goal: 1000000, contributed: 12, members: 20, nextDue: "2026-06-30", rate: "₦10,000/round", currentTurn: "Chioma Eze", nextTurn: "Emeka Nwosu" },
      { id: 4, name: "Education Fund", type: "goal", balance: 50000, goal: 1000000, contributed: 15, members: 22, nextDue: "2026-07-15", rate: "₦2,000/week", targetDate: "Dec 2026" },
    ],
    investmentPools: [
      { id: 1, name: "Community Farm Project", type: "Agriculture", totalPool: 500000, membersInvested: 12, expectedReturn: "15%", duration: "12 months", status: "active" },
      { id: 2, name: "Real Estate Trust", type: "Real Estate", totalPool: 2000000, membersInvested: 25, expectedReturn: "20%", duration: "24 months", status: "active" },
      { id: 3, name: "Tech Startup Fund", type: "Venture", totalPool: 1500000, membersInvested: 18, expectedReturn: "25%", duration: "18 months", status: "open" },
    ],
  };
});

export const events = [
  { id: 1, title: "Community Harvest Festival", date: "Jul 15, 2026", time: "10:00 AM", location: "St. Mary's Parish Hall", attendees: 78, community: "St. Mary's Church", category: "Festival", description: "Annual harvest celebration with food, music, and community bonding.", organizer: "Chioma Eze" },
  { id: 2, title: "Youth Mentorship Workshop", date: "Jul 22, 2026", time: "2:00 PM", location: "Al-Noor Community Center", attendees: 45, community: "Al-Noor Mosque", category: "Workshop", description: "Career guidance and mentorship for young members.", organizer: "Emeka Nwosu" },
  { id: 3, title: "Neighborhood Clean-Up Drive", date: "Aug 5, 2026", time: "8:00 AM", location: "Sunrise Estate Gate", attendees: 112, community: "Sunrise Neighborhood", category: "Community Service", description: "Monthly clean-up exercise for the neighborhood.", organizer: "Adebayo Johnson" },
  { id: 4, title: "Cooperative Investment Meeting", date: "Aug 12, 2026", time: "4:00 PM", location: "Virtual (Zoom)", attendees: 34, community: "Tech Founders Guild", category: "Meeting", description: "Quarterly review of cooperative investments.", organizer: "Funke Adeleke" },
  { id: 5, title: "Family Reunion Picnic", date: "Aug 20, 2026", time: "11:00 AM", location: "Tarkwa Bay Beach", attendees: 89, community: "Okafor Family Circle", category: "Social", description: "Annual family gathering and picnic.", organizer: "Ngozi Okonkwo" },
  { id: 6, title: "Building Project Fundraiser", date: "Sep 5, 2026", time: "3:00 PM", location: "Unity High School Auditorium", attendees: 200, community: "Unity High School '12", category: "Fundraiser", description: "Major fundraising event for the school building project.", organizer: "Tunde Bakare" },
];

export const feeds = [
  { id: 1, user: "Chioma Eze", action: "started a savings circle", community: "Okafor Family Circle", time: "2h ago", avatar: "CE" },
  { id: 2, user: "Emeka Nwosu", action: "donated ₦50,000 to", community: "Community Harvest Festival", time: "4h ago", avatar: "EN" },
  { id: 3, user: "St. Mary's Church", action: "posted a new event —", community: "Choir Rehearsal", time: "6h ago", avatar: "SM" },
  { id: 4, user: "Al-Noor Mosque", action: "reached ₦2M in welfare fund", community: "", time: "8h ago", avatar: "AN" },
  { id: 5, user: "Adebayo Johnson", action: "joined 3 new communities", community: "today", time: "12h ago", avatar: "AJ" },
  { id: 6, user: "Sunrise Neighborhood", action: "completed monthly contribution", community: "Development Fund", time: "1d ago", avatar: "SN" },
  { id: 7, user: "Tech Founders Guild", action: "launched investment pool", community: "Tech Startup Fund", time: "2d ago", avatar: "TF" },
];

export const lifeCircleMap = [
  { label: "Schools", communities: ["Unity High School '12", "Unilag Alumni"], icon: "🎓" },
  { label: "Faith", communities: ["St. Mary's Church", "Al-Noor Mosque"], icon: "🕊️" },
  { label: "Neighborhoods", communities: ["Sunrise Neighborhood", "Victoria Island"], icon: "🏘️" },
  { label: "Family", communities: ["Okafor Family Circle", "Nwosu Clan"], icon: "👨‍👩‍👧‍👦" },
  { label: "Workplace", communities: ["Tech Founders Guild", "Design Collective"], icon: "💼" },
  { label: "Social", communities: ["Lagos Book Club", "Naija Creatives"], icon: "🎨" },
  { label: "Village/Town", communities: ["Umuahia Development Union", "Nnewi Indigenes"], icon: "🌍" },
  { label: "Professional", communities: ["Nigerian Engineers", "Medics Network"], icon: "📋" },
];

export const marketplaceItems = [
  { id: 1, name: "Fresh Produce Bundle", seller: "Chioma's Farm", price: "₦15,000", category: "Food", location: "Lagos", rating: 4.8, image: "🥬" },
  { id: 2, name: "Web Development Package", seller: "Emeka Tech Solutions", price: "₦250,000", category: "Services", location: "Remote", rating: 4.6, image: "💻" },
  { id: 3, name: "3-Bedroom Apartment", seller: "Adebayo Realty", price: "₦85M", category: "Real Estate", location: "Victoria Island", rating: 4.7, image: "🏠" },
  { id: 4, name: "Bespoke Agbada Set", seller: "Funke's Fashion House", price: "₦65,000", category: "Fashion", location: "Ikeja", rating: 4.9, image: "👔" },
  { id: 5, name: "Car Service Package", seller: "Tunde Auto Services", price: "₦35,000", category: "Automotive", location: "Lekki", rating: 4.5, image: "🚗" },
  { id: 6, name: "Catering per plate", seller: "Chioma's Catering", price: "₦3,500", category: "Food", location: "Lagos", rating: 4.8, image: "🍽️" },
  { id: 7, name: "UI/UX Design Service", seller: "Design Collective", price: "₦180,000", category: "Services", location: "Remote", rating: 4.4, image: "🎨" },
  { id: 8, name: "Land Plot (500sqm)", seller: "Adebayo Realty", price: "₦12M", category: "Real Estate", location: "Ibeju-Lekki", rating: 4.7, image: "🏗️" },
];

export const familyBranches = [
  { id: 1, name: "Okafor Nnenne", surname: "Okafor", house: "Nnenne", village: "Umuahia", clan: "Okafor", members: 24, elders: ["Pa. Emeka Okafor", "Mama Ngozi Okafor"], description: "Descendants of Nnenne Okafor — the original homestead." },
  { id: 2, name: "Okafor Ukwu", surname: "Okafor", house: "Ukwu", village: "Umuahia", clan: "Okafor", members: 18, elders: ["Chief Obi Okafor", "Lolo Chioma Okafor"], description: "The Ukwu house of the Okafor clan." },
  { id: 3, name: "Nwosu Umunnabuike", surname: "Nwosu", house: "Umunnabuike", village: "Nnewi", clan: "Nwosu", members: 31, elders: ["Dr. Ifeanyi Nwosu", "Mrs. Adanna Nwosu"], description: "The Nwosu family rooted in Nnewi." },
  { id: 4, name: "Adebayo Ibadan", surname: "Adebayo", house: "Ibadan", village: "Ibadan", clan: "Adebayo", members: 42, elders: ["Chief Adebayo", "Mama Abike Adebayo"], description: "The Adebayo family compound in Ibadan." },
  { id: 5, name: "Okonkwo Umuoji", surname: "Okonkwo", house: "Umuoji", village: "Awka", clan: "Okonkwo", members: 27, elders: ["Prof. Chidi Okonkwo", "Mrs. Nneka Okonkwo"], description: "The Okonkwo lineage from Awka." },
];

export const clans = [
  { id: 1, name: "Okafor Clan", villages: ["Umuahia", "Ubakala", "Olokoro"], totem: "Leopard", population: 4500, description: "One of the oldest clans in Umuahia region." },
  { id: 2, name: "Nwosu Clan", villages: ["Nnewi", "Ozubulu", "Ihiala"], totem: "Eagle", population: 6200, description: "Prominent Nnewi-based clan with strong trade traditions." },
  { id: 3, name: "Adebayo Clan", villages: ["Ibadan", "Oyo", "Ogbomoso"], totem: "Crocodile", population: 8900, description: "Yoruba clan with deep roots in Ibadanland." },
  { id: 4, name: "Okonkwo Clan", villages: ["Awka", "Enugu", "Nsukka"], totem: "Tortoise", population: 3800, description: "Igbo clan known for scholarship and crafts." },
  { id: 5, name: "Eze Clan", villages: ["Owerri", "Mbaise", "Orlu"], totem: "Elephant", population: 7200, description: "Eze clan — royalty and nobility of Igboland." },
];

export const villages = [
  { id: 1, name: "Umuahia", state: "Abia", country: "Nigeria", clans: ["Okafor"], description: "Historic town and commercial center of Abia State." },
  { id: 2, name: "Nnewi", state: "Anambra", country: "Nigeria", clans: ["Nwosu"], description: "Industrial hub of Anambra State." },
  { id: 3, name: "Ibadan", state: "Oyo", country: "Nigeria", clans: ["Adebayo"], description: "Largest city in West Africa by landmass." },
  { id: 4, name: "Awka", state: "Anambra", country: "Nigeria", clans: ["Okonkwo"], description: "Capital of Anambra State — city of craftsmen." },
  { id: 5, name: "Owerri", state: "Imo", country: "Nigeria", clans: ["Eze"], description: "Heartland of Igbo culture and hospitality." },
  { id: 6, name: "Ubakala", state: "Abia", country: "Nigeria", clans: ["Okafor"], description: "Ancient village within Umuahia North." },
  { id: 7, name: "Mbaise", state: "Imo", country: "Nigeria", clans: ["Eze"], description: "Fertile agricultural region in Imo State." },
];

export const lineageRecords = [
  { id: 1, familyName: "Okafor", house: "Nnenne", village: "Umuahia", clan: "Okafor", generation: 7, patriarch: "Pa. Emeka Okafor", matriarch: "Mama Ngozi Okafor", origin: "Umuahia, Abia State", notableAncestors: ["Chief Okoro Okafor (1802-1878)", "Mma Okafor (1830-1910)"], branches: ["Nnenne", "Ukwu", "Ezeagu"], records: ["Land grant of 1845", "Chieftaincy title of 1902", "Mission school founding of 1920"] },
  { id: 2, familyName: "Nwosu", house: "Umunnabuike", village: "Nnewi", clan: "Nwosu", generation: 5, patriarch: "Dr. Ifeanyi Nwosu", matriarch: "Mrs. Adanna Nwosu", origin: "Nnewi, Anambra State", notableAncestors: ["Nwosu Nwafor (1850-1920)", "Mgbeke Nwosu (1860-1940)"], branches: ["Umunnabuike", "Umuokpala"], records: ["Trade route establishment 1880", "Community school building 1935"] },
  { id: 3, familyName: "Adebayo", house: "Ibadan", village: "Ibadan", clan: "Adebayo", generation: 6, patriarch: "Chief Adebayo", matriarch: "Mama Abike Adebayo", origin: "Ibadan, Oyo State", notableAncestors: ["Balogun Adebayo (1770-1840)", "Iyalode Abike (1800-1870)"], branches: ["Ibadan", "Oyo"], records: ["Warrior lineage of 1820", "Land ownership deed 1850"] },
  { id: 4, familyName: "Okonkwo", house: "Umuoji", village: "Awka", clan: "Okonkwo", generation: 8, patriarch: "Prof. Chidi Okonkwo", matriarch: "Mrs. Nneka Okonkwo", origin: "Awka, Anambra State", notableAncestors: ["Okonkwo Oji (1750-1820)", "Nwanyiocha Okonkwo (1780-1850)"], branches: ["Umuoji", "Umudioka"], records: ["First blacksmith of Awka 1800", "Colonial education pioneer 1910"] },
];

export const allPeople = [
  { id: 1, name: "Amara Okafor", avatar: "AO", location: "Lagos, Nigeria", familyName: "Okafor", clan: "Okafor", village: "Umuahia", house: "Nnenne", mutualConnections: 0, relation: "Self", isConnected: true },
  { id: 2, name: "Chioma Okafor", avatar: "CO", location: "Umuahia, Abia", familyName: "Okafor", clan: "Okafor", village: "Umuahia", house: "Nnenne", mutualConnections: 12, relation: "Sister", isConnected: true },
  { id: 3, name: "Emeka Okafor", avatar: "EO", location: "Abuja, Nigeria", familyName: "Okafor", clan: "Okafor", village: "Umuahia", house: "Ukwu", mutualConnections: 8, relation: "Cousin (Ukwu House)", isConnected: true },
  { id: 4, name: "Kelechi Okafor", avatar: "KO", location: "Port Harcourt, Rivers", familyName: "Okafor", clan: "Okafor", village: "Umuahia", house: "Nnenne", mutualConnections: 5, relation: "Cousin", isConnected: true },
  { id: 5, name: "Pa. Emeka Okafor", avatar: "PO", location: "Umuahia, Abia", familyName: "Okafor", clan: "Okafor", village: "Umuahia", house: "Nnenne", mutualConnections: 15, relation: "Grandfather (Patriarch)", isConnected: true },
  { id: 6, name: "Ngozi Okafor", avatar: "NO", location: "Umuahia, Abia", familyName: "Okafor", clan: "Okafor", village: "Umuahia", house: "Nnenne", mutualConnections: 15, relation: "Grandmother (Matriarch)", isConnected: true },
  { id: 7, name: "Emeka Nwosu", avatar: "EN", location: "Nnewi, Anambra", familyName: "Nwosu", clan: "Nwosu", village: "Nnewi", house: "Umunnabuike", mutualConnections: 3, relation: "Distant Cousin (Nwosu)", isConnected: false },
  { id: 8, name: "Adanna Nwosu", avatar: "AN", location: "Onitsha, Anambra", familyName: "Nwosu", clan: "Nwosu", village: "Nnewi", house: "Umunnabuike", mutualConnections: 2, relation: "Extended Family (Nwosu)", isConnected: false },
  { id: 9, name: "Ifeanyi Nwosu", avatar: "IN", location: "Enugu, Nigeria", familyName: "Nwosu", clan: "Nwosu", village: "Nnewi", house: "Umunnabuike", mutualConnections: 4, relation: "Clan Elder (Nwosu)", isConnected: false },
  { id: 10, name: "Adebayo Johnson", avatar: "AJ", location: "Ibadan, Oyo", familyName: "Adebayo", clan: "Adebayo", village: "Ibadan", house: "Ibadan", mutualConnections: 6, relation: "Extended Family (Adebayo)", isConnected: true },
  { id: 11, name: "Abike Adebayo", avatar: "AA", location: "Ibadan, Oyo", familyName: "Adebayo", clan: "Adebayo", village: "Ibadan", house: "Ibadan", mutualConnections: 3, relation: "Aunt (Adebayo)", isConnected: true },
  { id: 12, name: "Tunde Adebayo", avatar: "TA", location: "Lagos, Nigeria", familyName: "Adebayo", clan: "Adebayo", village: "Ibadan", house: "Ibadan", mutualConnections: 5, relation: "Cousin (Adebayo)", isConnected: false },
  { id: 13, name: "Funke Adeleke", avatar: "FA", location: "Lagos, Nigeria", familyName: "Adeleke", clan: "Eze", village: "Owerri", house: null, mutualConnections: 7, relation: "Friend (Eze Clan)", isConnected: true },
  { id: 14, name: "Chidi Okonkwo", avatar: "CK", location: "Awka, Anambra", familyName: "Okonkwo", clan: "Okonkwo", village: "Awka", house: "Umuoji", mutualConnections: 2, relation: "Clan Member (Okonkwo)", isConnected: false },
  { id: 15, name: "Nneka Okonkwo", avatar: "NK", location: "Enugu, Nigeria", familyName: "Okonkwo", clan: "Okonkwo", village: "Awka", house: "Umuoji", mutualConnections: 1, relation: "Clan Member (Okonkwo)", isConnected: false },
  { id: 16, name: "Zainab Abdullah", avatar: "ZA", location: "Kano, Nigeria", familyName: "Abdullah", clan: null, village: null, house: null, mutualConnections: 4, relation: "Professional Connection", isConnected: true },
  { id: 17, name: "Chisom Eze", avatar: "CE", location: "Owerri, Imo", familyName: "Eze", clan: "Eze", village: "Owerri", house: "Eze Royal", mutualConnections: 3, relation: "Village Connection (Owerri)", isConnected: false },
  { id: 18, name: "Musa Danjuma", avatar: "MD", location: "Abuja, Nigeria", familyName: "Danjuma", clan: null, village: null, house: null, mutualConnections: 2, relation: "Professional Connection", isConnected: false },
  { id: 19, name: "Yetunde Alabi", avatar: "YA", location: "Ibadan, Oyo", familyName: "Alabi", clan: "Adebayo", village: "Ibadan", house: null, mutualConnections: 3, relation: "Village Connection (Ibadan)", isConnected: false },
  { id: 20, name: "Grace Okafor", avatar: "GO", location: "Ubakala, Abia", familyName: "Okafor", clan: "Okafor", village: "Ubakala", house: "Ezeagu", mutualConnections: 4, relation: "Distant Relative (Ubakala)", isConnected: false },
];

export const peopleRecommendations = [
  { personId: 20, reason: "Same clan (Okafor) — Grace Okafor from Ubakala is a distant cousin", type: "clan" },
  { personId: 7, reason: "Same village connection (Nnewi) — Emeka Nwosu may be related through Nwosu clan", type: "clan" },
  { personId: 19, reason: "Same village (Ibadan) — Yetunde Alabi shares your hometown", type: "village" },
  { personId: 17, reason: "Eze clan connection via Funke Adeleke — mutual friend", type: "mutual" },
  { personId: 14, reason: "Extended relative — Chidi Okonkwo shares lineage with Okafor clan through marriage", type: "lineage" },
  { personId: 12, reason: "Same family name (Adebayo) — Tunde is a cousin of your connected relative Adebayo Johnson", type: "family" },
  { personId: 8, reason: "Nwosu clan member — Adanna Nwosu from your extended family network", type: "clan" },
  { personId: 18, reason: "Professional network — Musa Danjuma in your industry", type: "professional" },
];

export const allSavingsPlans = [
  { id: 1, name: "Daily Savings", type: "daily", balance: 45000, goal: 100000, contributed: 45, members: 34, nextDue: "2026-06-22", rate: "₦1,000/day", community: "St. Mary's Church", communityId: 1 },
  { id: 2, name: "Monthly Contribution", type: "monthly", balance: 120000, goal: 500000, contributed: 67, members: 56, nextDue: "2026-07-01", rate: "₦5,000/month", community: "Al-Noor Mosque", communityId: 2 },
  { id: 3, name: "Rotational Ajo", type: "rotational", balance: 200000, goal: 1000000, contributed: 12, members: 20, nextDue: "2026-06-30", rate: "₦10,000/round", community: "Sunrise Neighborhood", communityId: 3, currentTurn: "Chioma Eze", nextTurn: "Emeka Nwosu" },
  { id: 4, name: "Education Goal Fund", type: "goal", balance: 50000, goal: 1000000, contributed: 15, members: 22, nextDue: "2026-07-15", rate: "₦2,000/week", community: "Okafor Family Circle", communityId: 5, targetDate: "Dec 2026" },
  { id: 5, name: "Emergency Savings", type: "monthly", balance: 890000, goal: 2000000, contributed: 112, members: 120, nextDue: "2026-07-01", rate: "₦2,000/month", community: "Tech Founders Guild", communityId: 6 },
  { id: 6, name: "Building Project Savings", type: "goal", balance: 2500000, goal: 15000000, contributed: 89, members: 95, nextDue: "2026-07-05", rate: "₦10,000/month", community: "Unity High School '12", communityId: 4, targetDate: "Dec 2027" },
];
