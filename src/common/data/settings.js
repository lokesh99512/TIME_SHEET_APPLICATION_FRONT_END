// ------------ users --------------
export const settingsUsersData = [
  {
    id: 1,
    user_name: "sumits@gmail.com",
    first_name: "Sumit",
    last_name: "Samaddar",
    role: "Admin",
    last_active: "0.5 hrs",
    is_active: true,
  },
  {
    id: 2,
    user_name: "darshita.uidev@gmail.com",
    first_name: "Darshita",
    last_name: "UI",
    role: "Admin",
    last_active: "0.5 hrs",
    is_active: true,
  },
  {
    id: 3,
    user_name: "vijay.uidev2@gmail.com",
    first_name: "Vijay",
    last_name: "ui",
    role: "Admin",
    last_active: "0.5 hrs",
    is_active: true,
  },
];

// ------------- company details -----------------
export const companyDetailsData = [
  {
    id: 1,
    companyName: "Swenlog Supply Chain Pvt Ltd",
    contactNumber: "9800012345",
    email: "sanjay@swenlog.in",
    companyAddress: "123, Banglore, Karnataka",
    city: "Bangalore",
    state: "Karnataka",
    zipcode: "560076",
    country: "India",

    panNumber: "ABCDF9898A",
    cinNumber: "1234",
    tranceporterId: "TESTID",
    gstNumber: "29BBHAC1234B1ZM",
    placeOfSupply: "KA",
    moreGstNumbers: [{ gstNo: "24GJHBB9907B1ZM", placeOfSupply: "GJ" }],

    industryType: "Supply Chain",
    entityType: "Private Limited",
  },
];

// company details select options
export const industryType = [
  { label: "SUPPLY CHAIN", value: "SUPPLY_CHAIN" },
  { label: "SOFTWARE SERVICE", value: "SOFTWARE_SERVICE" },
  { label: "AGRICULTURE", value: "AGRICULTURE" },
  { label: "MANUFACTURING", value: "MANUFACTURING" },
  { label: "TRANSPORTATION", value: "TRANSPORTATION" }
];

export const entityType = [
  { label: "PRIVATE LTD", value: "PRIVATE_LTD" },
  { label: "PUBLIC LTD", value: "PUBLIC_LTD" },
  { label: "SINGLE DIRECTOR", value: "SINGLE_DIRECTOR" },
  { label: "LLP", value: "LLP" },
  { label: "PROPRIETORSHIP", value: "PROPRIETORSHIP" },
];

export const placeOfSupply = [
  { label: "Jammu & Kashmir", value: "JK", Code: 1 },
  { label: "Himachal Pradesh", value: "HP", Code: 2 },
  { label: "Punjab", value: "PB", Code: 3 },
  { label: "Chandigarh", value: "CH", Code: 4 },
  { label: "Uttarakhand", value: "UT", Code: 5 },
  { label: "Haryana", value: "HR", Code: 6 },
  { label: "Delhi", value: "DL", Code: 7 },
  { label: "Rajasthan", value: "RJ", Code: 8 },
  { label: "Uttar Prades", value: "UP", Code: 9 },
  { label: "Bihar", value: "BH", Code: 10 },
  { label: "Sikkim", value: "SK", Code: 11 },
  { label: "Arunachal Pradesh", value: "AR", Code: 12 },
  { label: "Nagaland", value: "NL", Code: 13 },
  { label: "Manipur", value: "MN", Code: 14 },
  { label: "Mizoram", value: "MI", Code: 15 },
  { label: "Tripura", value: "TR", Code: 16 },
  { label: "Meghalaya", value: "ME", Code: 17 },
  { label: "Assam", value: "AS", Code: 18 },
  { label: "West Bengal", value: "WB", Code: 19 },
  { label: "Jharkhand", value: "JH", Code: 20 },
  { label: "Odisha", value: "OR", Code: 21 },
  { label: "Chattisgarh", value: "CT", Code: 22 },
  { label: "Madhya Pradesh", value: "MP", Code: 23 },
  { label: "Gujarat", value: "GJ", Code: 24 },
  { label: "Daman & Diu", value: "DD", Code: 25 },
  { label: "Dadra & Nagar Haveli", value: "DN", Code: 26 },
  { label: "Maharashtra", value: "MH", Code: 27 },
  { label: "Andhra Pradesh", value: "AP", Code: 28 },
  { label: "Karnataka", value: "KA", Code: 29 },
  { label: "Goa", value: "GA", Code: 30 },
  { label: "Lakshadweep", value: "LD", Code: 31 },
  { label: "Kerala", value: "KL", Code: 32 },
  { label: "Tamil Nadu", value: "TN", Code: 33 },
  { label: "Puducherry", value: "PY", Code: 34 },
  { label: "Andaman & Nicobar Island", value: "AN", Code: 35 },
  { label: "Telangana", value: "TL", Code: 36 },
  { label: "Hyderabad GST Commissionerate", value: "AD", Code: 37 },
  { label: "Kurnool GST Commissionerate", value: "LA", Code: 38 },
];

export const country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const zipcode_list = [
  123456, 234567, 345678, 456789, 567890, 987654, 876543, 765432, 654321,
  987698, 234874, 234068, 466844, 797645, 785645, 345346, 575645, 346457,
];

export const state_list = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

export const city_list = [
  "Adilabad",
  "Anantapur",
  "Chittoor",
  "Kakinada",
  "Guntur",
  "Hyderabad",
  "Karimnagar",
  "Khammam",
  "Krishna",
  "Kurnool",
  "Mahbubnagar",
  "Medak",
  "Nalgonda",
  "Nizamabad",
  "Ongole",
  "Hyderabad",
  "Srikakulam",
  "Nellore",
  "Visakhapatnam",
  "Vizianagaram",
  "Warangal",
  "Eluru",
  "Kadapa",

  "Anjaw",
  "Changlang",
  "East Siang",
  "Kurung Kumey",
  "Lohit",
  "Lower Dibang Valley",
  "Lower Subansiri",
  "Papum Pare",
  "Tawang",
  "Tirap",
  "Dibang Valley",
  "Upper Siang",
  "Upper Subansiri",
  "West Kameng",
  "West Siang",

  "Baksa",
  "Barpeta",
  "Bongaigaon",
  "Cachar",
  "Chirang",
  "Darrang",
  "Dhemaji",
  "Dima Hasao",
  "Dhubri",
  "Dibrugarh",
  "Goalpara",
  "Golaghat",
  "Hailakandi",
  "Jorhat",
  "Kamrup",
  "Kamrup Metropolitan",
  "Karbi Anglong",
  "Karimganj",
  "Kokrajhar",
  "Lakhimpur",
  "Marigaon",
  "Nagaon",
  "Nalbari",
  "Sibsagar",
  "Sonitpur",
  "Tinsukia",
  "Udalguri",

  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "East Champaran",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Kaimur",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Munger",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnia",
  "Rohtas",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Sheikhpura",
  "Sheohar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali",
  "West Champaran",
  "Chandigarh",

  "Bastar",
  "Bijapur",
  "Bilaspur",
  "Dantewada",
  "Dhamtari",
  "Durg",
  "Jashpur",
  "Janjgir-Champa",
  "Korba",
  "Koriya",
  "Kanker",
  "Kabirdham (Kawardha)",
  "Mahasamund",
  "Narayanpur",
  "Raigarh",
  "Rajnandgaon",
  "Raipur",
  "Surguja",

  "Dadra and Nagar Haveli",

  "Daman",
  "Diu",

  "Central Delhi",
  "East Delhi",
  "New Delhi",
  "North Delhi",
  "North East Delhi",
  "North West Delhi",
  "South Delhi",
  "South West Delhi",
  "West Delhi",

  "North Goa",
  "South Goa",

  "Ahmedabad",
  "Amreli district",
  "Anand",
  "Banaskantha",
  "Bharuch",
  "Bhavnagar",
  "Dahod",
  "The Dangs",
  "Gandhinagar",
  "Jamnagar",
  "Junagadh",
  "Kutch",
  "Kheda",
  "Mehsana",
  "Narmada",
  "Navsari",
  "Patan",
  "Panchmahal",
  "Porbandar",
  "Rajkot",
  "Sabarkantha",
  "Surendranagar",
  "Surat",
  "Vyara",
  "Vadodara",
  "Valsad",

  "Ambala",
  "Bhiwani",
  "Faridabad",
  "Fatehabad",
  "Gurgaon",
  "Hissar",
  "Jhajjar",
  "Jind",
  "Karnal",
  "Kaithal",
  "Kurukshetra",
  "Mahendragarh",
  "Mewat",
  "Palwal",
  "Panchkula",
  "Panipat",
  "Rewari",
  "Rohtak",
  "Sirsa",
  "Sonipat",
  "Yamuna Nagar",

  "Bilaspur",
  "Chamba",
  "Hamirpur",
  "Kangra",
  "Kinnaur",
  "Kullu",
  "Lahaul and Spiti",
  "Mandi",
  "Shimla",
  "Sirmaur",
  "Solan",
  "Una",

  "Anantnag",
  "Badgam",
  "Bandipora",
  "Baramulla",
  "Doda",
  "Ganderbal",
  "Jammu",
  "Kargil",
  "Kathua",
  "Kishtwar",
  "Kupwara",
  "Kulgam",
  "Leh",
  "Poonch",
  "Pulwama",
  "Rajauri",
  "Ramban",
  "Reasi",
  "Samba",
  "Shopian",
  "Srinagar",
  "Udhampur",

  "Bokaro",
  "Chatra",
  "Deoghar",
  "Dhanbad",
  "Dumka",
  "East Singhbhum",
  "Garhwa",
  "Giridih",
  "Godda",
  "Gumla",
  "Hazaribag",
  "Jamtara",
  "Khunti",
  "Koderma",
  "Latehar",
  "Lohardaga",
  "Pakur",
  "Palamu",
  "Ramgarh",
  "Ranchi",
  "Sahibganj",
  "Seraikela Kharsawan",
  "Simdega",
  "West Singhbhum",

  "Bagalkot",
  "Bangalore Rural",
  "Bangalore Urban",
  "Belgaum",
  "Bellary",
  "Bidar",
  "Bijapur",
  "Chamarajnagar",
  "Chikkamagaluru",
  "Chikkaballapur",
  "Chitradurga",
  "Davanagere",
  "Dharwad",
  "Dakshina Kannada",
  "Gadag",
  "Gulbarga",
  "Hassan",
  "Haveri district",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysore",
  "Raichur",
  "Shimoga",
  "Tumkur",
  "Udupi",
  "Uttara Kannada",
  "Ramanagara",
  "Yadgir",

  "Alappuzha",
  "Ernakulam",
  "Idukki",
  "Kannur",
  "Kasaragod",
  "Kollam",
  "Kottayam",
  "Kozhikode",
  "Malappuram",
  "Palakkad",
  "Pathanamthitta",
  "Thrissur",
  "Thiruvananthapuram",
  "Wayanad",

  "Alirajpur",
  "Anuppur",
  "Ashok Nagar",
  "Balaghat",
  "Barwani",
  "Betul",
  "Bhind",
  "Bhopal",
  "Burhanpur",
  "Chhatarpur",
  "Chhindwara",
  "Damoh",
  "Datia",
  "Dewas",
  "Dhar",
  "Dindori",
  "Guna",
  "Gwalior",
  "Harda",
  "Hoshangabad",
  "Indore",
  "Jabalpur",
  "Jhabua",
  "Katni",
  "Khandwa (East Nimar)",
  "Khargone (West Nimar)",
  "Mandla",
  "Mandsaur",
  "Morena",
  "Narsinghpur",
  "Neemuch",
  "Panna",
  "Rewa",
  "Rajgarh",
  "Ratlam",
  "Raisen",
  "Sagar",
  "Satna",
  "Sehore",
  "Seoni",
  "Shahdol",
  "Shajapur",
  "Sheopur",
  "Shivpuri",
  "Sidhi",
  "Singrauli",
  "Tikamgarh",
  "Ujjain",
  "Umaria",
  "Vidisha",

  "Ahmednagar",
  "Akola",
  "Amravati",
  "Aurangabad",
  "Bhandara",
  "Beed",
  "Buldhana",
  "Chandrapur",
  "Dhule",
  "Gadchiroli",
  "Gondia",
  "Hingoli",
  "Jalgaon",
  "Jalna",
  "Kolhapur",
  "Latur",
  "Mumbai City",
  "Mumbai suburban",
  "Nandurbar",
  "Nanded",
  "Nagpur",
  "Nashik",
  "Osmanabad",
  "Parbhani",
  "Pune",
  "Raigad",
  "Ratnagiri",
  "Sindhudurg",
  "Sangli",
  "Solapur",
  "Satara",
  "Thane",
  "Wardha",
  "Washim",
  "Yavatmal",

  "Bishnupur",
  "Churachandpur",
  "Chandel",
  "Imphal East",
  "Senapati",
  "Tamenglong",
  "Thoubal",
  "Ukhrul",
  "Imphal West",

  "East Garo Hills",
  "East Khasi Hills",
  "Jaintia Hills",
  "Ri Bhoi",
  "South Garo Hills",
  "West Garo Hills",
  "West Khasi Hills",

  "Aizawl",
  "Champhai",
  "Kolasib",
  "Lawngtlai",
  "Lunglei",
  "Mamit",
  "Saiha",
  "Serchhip",

  "Dimapur",
  "Kohima",
  "Mokokchung",
  "Mon",
  "Phek",
  "Tuensang",
  "Wokha",
  "Zunheboto",

  "Angul",
  "Boudh (Bauda)",
  "Bhadrak",
  "Balangir",
  "Bargarh (Baragarh)",
  "Balasore",
  "Cuttack",
  "Debagarh (Deogarh)",
  "Dhenkanal",
  "Ganjam",
  "Gajapati",
  "Jharsuguda",
  "Jajpur",
  "Jagatsinghpur",
  "Khordha",
  "Kendujhar (Keonjhar)",
  "Kalahandi",
  "Kandhamal",
  "Koraput",
  "Kendrapara",
  "Malkangiri",
  "Mayurbhanj",
  "Nabarangpur",
  "Nuapada",
  "Nayagarh",
  "Puri",
  "Rayagada",
  "Sambalpur",
  "Subarnapur (Sonepur)",
  "Sundergarh",

  "Karaikal",
  "Mahe",
  "Pondicherry",
  "Yanam",

  "Amritsar",
  "Barnala",
  "Bathinda",
  "Firozpur",
  "Faridkot",
  "Fatehgarh Sahib",
  "Fazilka",
  "Gurdaspur",
  "Hoshiarpur",
  "Jalandhar",
  "Kapurthala",
  "Ludhiana",
  "Mansa",
  "Moga",
  "Sri Muktsar Sahib",
  "Pathankot",
  "Patiala",
  "Rupnagar",
  "Ajitgarh (Mohali)",
  "Sangrur",
  "Nawanshahr",
  "Tarn Taran",

  "Ajmer",
  "Alwar",
  "Bikaner",
  "Barmer",
  "Banswara",
  "Bharatpur",
  "Baran",
  "Bundi",
  "Bhilwara",
  "Churu",
  "Chittorgarh",
  "Dausa",
  "Dholpur",
  "Dungapur",
  "Ganganagar",
  "Hanumangarh",
  "Jhunjhunu",
  "Jalore",
  "Jodhpur",
  "Jaipur",
  "Jaisalmer",
  "Jhalawar",
  "Karauli",
  "Kota",
  "Nagaur",
  "Pali",
  "Pratapgarh",
  "Rajsamand",
  "Sikar",
  "Sawai Madhopur",
  "Sirohi",
  "Tonk",
  "Udaipur",

  "East Sikkim",
  "North Sikkim",
  "South Sikkim",
  "West Sikkim",

  "Ariyalur",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Madurai",
  "Nagapattinam",
  "Nilgiris",
  "Namakkal",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Salem",
  "Sivaganga",
  "Tirupur",
  "Tiruchirappalli",
  "Theni",
  "Tirunelveli",
  "Thanjavur",
  "Thoothukudi",
  "Tiruvallur",
  "Tiruvarur",
  "Tiruvannamalai",
  "Vellore",
  "Viluppuram",
  "Virudhunagar",

  "Dhalai",
  "North Tripura",
  "South Tripura",
  "Khowai",
  "West Tripura",

  "Agra",
  "Allahabad",
  "Aligarh",
  "Ambedkar Nagar",
  "Auraiya",
  "Azamgarh",
  "Barabanki",
  "Budaun",
  "Bagpat",
  "Bahraich",
  "Bijnor",
  "Ballia",
  "Banda",
  "Balrampur",
  "Bareilly",
  "Basti",
  "Bulandshahr",
  "Chandauli",
  "Chhatrapati Shahuji Maharaj Nagar",
  "Chitrakoot",
  "Deoria",
  "Etah",
  "Kanshi Ram Nagar",
  "Etawah",
  "Firozabad",
  "Farrukhabad",
  "Fatehpur",
  "Faizabad",
  "Gautam Buddh Nagar",
  "Gonda",
  "Ghazipur",
  "Gorakhpur",
  "Ghaziabad",
  "Hamirpur",
  "Hardoi",
  "Mahamaya Nagar",
  "Jhansi",
  "Jalaun",
  "Jyotiba Phule Nagar",
  "Jaunpur district",
  "Ramabai Nagar (Kanpur Dehat)",
  "Kannauj",
  "Kanpur",
  "Kaushambi",
  "Kushinagar",
  "Lalitpur",
  "Lakhimpur Kheri",
  "Lucknow",
  "Mau",
  "Meerut",
  "Maharajganj",
  "Mahoba",
  "Mirzapur",
  "Moradabad",
  "Mainpuri",
  "Mathura",
  "Muzaffarnagar",
  "Panchsheel Nagar district (Hapur)",
  "Pilibhit",
  "Shamli",
  "Pratapgarh",
  "Rampur",
  "Raebareli",
  "Saharanpur",
  "Sitapur",
  "Shahjahanpur",
  "Sant Kabir Nagar",
  "Siddharthnagar",
  "Sonbhadra",
  "Sant Ravidas Nagar",
  "Sultanpur",
  "Shravasti",
  "Unnao",
  "Varanasi",

  "Almora",
  "Bageshwar",
  "Chamoli",
  "Champawat",
  "Dehradun",
  "Haridwar",
  "Nainital",
  "Pauri Garhwal",
  "Pithoragarh",
  "Rudraprayag",
  "Tehri Garhwal",
  "Udham Singh Nagar",
  "Uttarkashi",

  "Birbhum",
  "Bankura",
  "Bardhaman",
  "Darjeeling",
  "Dakshin Dinajpur",
  "Hooghly",
  "Howrah",
  "Jalpaiguri",
  "Cooch Behar",
  "Kolkata",
  "Maldah",
  "Paschim Medinipur",
  "Purba Medinipur",
  "Murshidabad",
  "Nadia",
  "North 24 Parganas",
  "South 24 Parganas",
  "Purulia",
  "Uttar Dinajpur",
];

// --------------------- add customer form option
export const optionCusttitle = [
  { label: "Mr", value: "Mr" },
  { label: "Ms", value: "Ms" },
  { label: "Mrs", value: "Mrs" },
]
export const optionCustopCode = [
  { label: "+91", value: "+91" },
]
export const optionCustdepartment = [
  { label: "Accounts", value: "ACCOUNTS" },
  { label: "Sales", value: "SALES" },
  { label: "Finance", value: "FINANCE" },
  { label: "Management", value: "MANAGEMENT" },
  { label: "Primary", value: "PRIMARY" },
  { label: "Add New", value: "Add New" },
]
export const optionCustdesignation = [
  { label: "Executive", value: "EXECUTIVE" },
  { label: "Asst. Manager", value: "ASST_MANAGER" },
  { label: "Manager", value: "MANAGER" },
  { label: "Sr. Manager", value: "SR_MANAGER" },
  { label: "AVP", value: "AVP" },
  { label: "VP", value: "VP" },
  { label: "President", value: "PRESIDENT" },
  { label: "Director", value: "DIRECTOR" },
  { label: "CEO", value: "CEO" },
  { label: "COO", value: "COO" },
  { label: "MD", value: "MD" },
  // { label: "Sales", value: "Sales" },
  // { label: "Finance", value: "Finance" },
  // { label: "Management", value: "Management" },
  // { label: "Primary", value: "Primary" },
  { label: "Add New", value: "Add New" },
]
// export const optionCustentityType = [
//   { label: "Proprietorship", value: "Proprietorship" },
//   { label: "Single Director", value: "SINGLE_DIRECTOR" },
//   { label: "LLP", value: "LLP" },
//   { label: "Private Limited", value: "Private Limited" },
//   { label: "Public Limited", value: "Public Limited" },
//   { label: "Add New", value: "Add New" },
// ]

export const optionCustentityType = [
  { label: "PRIVATE LTD", value: "PRIVATE_LTD" },
  { label: "PUBLIC LTD", value: "PUBLIC_LTD" },
  { label: "SINGLE DIRECTOR", value: "SINGLE_DIRECTOR" },
  { label: "LLP", value: "LLP" },
  { label: "PROPRIETORSHIP", value: "PROPRIETORSHIP" },
];
// export const optionCustindustryType = [
//   { label: "Supply Chain", value: "Supply Chain" },
//   { label: "Software services", value: "Software services" },
//   { label: "Agriculture", value: "AGRICULTURE" },
//   { label: "Manufacturing", value: "Manufacturing" },
//   { label: "Transportation", value: "Transportation" },
//   { label: "Add New", value: "Add New" },
// ]

export const optionCustindustryType = [
  { label: "SUPPLY CHAIN", value: "SUPPLY_CHAIN" },
  { label: "SOFTWARE SERVICE", value: "SOFTWARE_SERVICE" },
  { label: "AGRICULTURE", value: "AGRICULTURE" },
  { label: "MANUFACTURING", value: "MANUFACTURING" },
  { label: "TRANSPORTATION", value: "TRANSPORTATION" }
];

export const optionCustcustomerType = [
  { label: "Customer", value: "CUSTOMER" },
  { label: "Agent", value: "AGENT" },
  { label: "Franchisee", value: "FRANCHISEE" },
  { label: "Add New", value: "Add New" },
]
export const optionCustsalesEmployee = [
  { label: "Ajay", value: "Ajay" },
  { label: "Hitesh", value: "Hitesh" },
  { label: "Mahendra", value: "Mahendra" },
  { label: "Mahes", value: "Mahes" },
  { label: "Add New", value: "Add New" },
]
export const optionCustkeyAccountManager = [
  { label: "Ajay", value: "Ajay" },
  { label: "Hitesh", value: "Hitesh" },
  { label: "Mahendra", value: "Mahendra" },
  { label: "Mahes", value: "Mahes" },
  { label: "Add New", value: "Add New" },
]

export const marginType = [
  {label:"percentage"},
  {label:"FLAT"}
  ];