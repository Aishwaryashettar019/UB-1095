const listings = [
  {
    title: "Rice",
    typeofcrop: "Kharif",
    price: 1800,
    image: "https://media.istockphoto.com/id/153737841/photo/rice.jpg?s=612x612&w=0&k=20&c=lfO7iLT0UsDDzra0uBOsN1rvr2d5OEtrG2uwbts33_c=",
    soilType: "Loamy",
    frequency: "Every 7–10 days",
    season: "June–October",
    timeofday: "Morning 6–9 AM (medium flow)",
    suggestion: "Avoid late evenings to reduce fungal risk"
  },
  {
    title: "Wheat",
    typeofcrop: "Rabi",
    price: 2000,
    image: "https://m.media-amazon.com/images/I/714xCG6CxKL._UF1000,1000_QL80_.jpg",
    soilType: "Clay",
    frequency: "Every 20–25 days",
    season: "November–March",
    timeofday: "Morning 7–10 AM (slow flow)",
    suggestion: "Critical irrigation at crown root (21 days) and flowering"
  },
  {
    title: "Maize",
    typeofcrop: "Kharif",
    price: 1700,
    image: "https://cdn.tridge.com/image/original/91/a4/15/91a41569ed9068351c5c5dbd28de9634d47e1904.jpg",
    soilType: "Sandy loam",
    frequency: "Every 12–15 days",
    season: "June–September",
    timeofday: "Morning 6–8 AM or Evening 5–7 PM (medium flow)",
    suggestion: "Ensure moist soil at tasseling and grain filling"
  },
  {
    title: "Sugarcane",
    typeofcrop: "Annual/Kharif",
    price: 3000,
    image: "https://5.imimg.com/data5/SELLER/Default/2023/9/GL/TA/MC/153507497/sugarcane-500x500.jpg",
    soilType: "Alluvial",
    frequency: "Every 10–12 days",
    season: "February planting",
    timeofday: "Morning 6–10 AM (medium–high flow)",
    suggestion: "Keep soil moist during germination, tillering, and grand growth"
  },
  {
    title: "Soybean",
    typeofcrop: "Kharif",
    price: 1600,
    image: "https://www.shutterstock.com/shutterstock/photos/1467898517/display_1500/stock-photo-soy-bean-mature-seeds-with-immature-soybeans-in-the-pod-soy-bean-close-up-open-green-soybean-pod-1467898517.jpg",
    soilType: "Black cotton",
    frequency: "Every 10–12 days",
    season: "July–October",
    timeofday: "Morning 7–9 AM (medium speed)",
    suggestion: "Avoid standing water during flowering"
  },
  {
    title: "Barley",
    typeofcrop: "Rabi",
    price: 1500,
    image: "https://goodness-farm.com/wp-content/uploads/2023/04/barley.jpg",
    soilType: "Light",
    frequency: "3–4 irrigations in season",
    season: "November–February",
    timeofday: "Morning 8–10 AM (light flow)",
    suggestion: "Critical at tillering and heading stages"
  },
  {
    title: "Groundnut",
    typeofcrop: "Kharif",
    price: 2200,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Groundnut_field.jpg",
    soilType: "Sandy loam",
    frequency: "Every 8–10 days",
    season: "June–September",
    timeofday: "Morning 6–8 AM (medium flow)",
    suggestion: "Maintain moisture during pegging and pod formation"
  },
  {
    title: "Mustard",
    typeofcrop: "Rabi",
    price: 2500,
    image: "https://sharmaglobletrade.com/wp-content/uploads/2024/08/Mustard-Seeds.jpg",
    soilType: "Loamy",
    frequency: "Every 20–25 days",
    season: "October–February",
    timeofday: "Morning 7–9 AM (light flow)",
    suggestion: "Irrigate lightly during flowering and pod filling"
  },
  {
    title: "Cotton",
    typeofcrop: "Kharif",
    price: 4500,
    image: "https://fadfay.com/cdn/shop/articles/cotton-plants-are-tall-and-green-with-a-branching--Xi2ktwlpS02wO48TO6CUsw-sqZ-RNRzS1GLIO91uGXvnA.jpg?v=1751352893&width=1024",
    soilType: "Black",
    frequency: "Every 12–15 days",
    season: "June–November",
    timeofday: "Morning 6–9 AM (medium flow)",
    suggestion: "Critical stages: flowering and boll development"
  },
  {
    title: "Watermelon",
    typeofcrop: "Zaid",
    price: 3000,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Watermelon_field_in_Texas.jpg",
    soilType: "Sandy",
    frequency: "Every 7–8 days",
    season: "March–June",
    timeofday: "Morning 6–8 AM",
    suggestion: "Maintain even soil moisture for fruit setting"
  },
  {
    title: "Cucumber",
    typeofcrop: "Zaid",
    price: 1800,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Cucumber_field.jpg",
    soilType: "Loamy",
    frequency: "Every 7–8 days",
    season: "March–June",
    timeofday: "Morning 6–9 AM (low–medium flow)",
    suggestion: "Maintain uniform moisture"
  },
  {
    title: "Chickpea",
    typeofcrop: "Rabi",
    price: 2100,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Chickpea_field.jpg",
    soilType: "Black",
    frequency: "2–3 irrigations in season",
    season: "November–March",
    timeofday: "Morning 7–9 AM",
    suggestion: "Irrigate at branching, flowering, and pod filling"
  },
  {
    title: "Sorghum (Jowar)",
    typeofcrop: "Kharif",
    price: 1700,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/37/Sorghum_field.jpg",
    soilType: "Medium black",
    frequency: "Every 12–15 days",
    season: "June–September",
    timeofday: "Morning 6–8 AM (medium flow)",
    suggestion: "Critical stages: booting and grain filling"
  },
  {
    title: "Pumpkin",
    typeofcrop: "Zaid",
    price: 2000,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Pumpkin_field.jpg",
    soilType: "Sandy loam",
    frequency: "Every 8–10 days",
    season: "March–July",
    timeofday: "Morning 6–9 AM (medium flow)",
    suggestion: "Ensure soil moisture during fruit development"
  },
  {
    title: "Lentil",
    typeofcrop: "Rabi",
    price: 1900,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Lentil_field.jpg",
    soilType: "Clay",
    frequency: "1–2 irrigations in season",
    season: "November–March",
    timeofday: "Morning 7–9 AM (light flow)",
    suggestion: "Irrigate at pre-flowering and pod filling"
  }
];




module.exports={data:listings};