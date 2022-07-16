const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,

    useUnifiedTopology: true
}); 

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * cities.length);
        const camp = new Campground({
            author : "62d2e8afcc8dc986c56eae6b",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
         
            price: Math.floor(Math.random() * 20) + 10,
            geometry:{
                type: 'Point',
                coordinates: [cities[random1000].longitude,
                  cities[random1000].latitude]
                  
                
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium molestiae maiores totam, dignissimos perspiciatis distinctio quibusdam deserunt non incidunt commodi dolorum aliquam ea debitis vel molestias aperiam minus sit quisquam!",
            images:[
     
                {
                  url: 'https://res.cloudinary.com/dlckzs7d5/image/upload/v1657822636/YelpCamp/n7kmtlv8axus6dt81zqo.jpg',
                  filename: 'YelpCamp/n7kmtlv8axus6dt81zqo',
                 
                },
                {
                  url: 'https://res.cloudinary.com/dlckzs7d5/image/upload/v1657822639/YelpCamp/sd9vsstwtke11l2qoasi.jpg',
                  filename: 'YelpCamp/sd9vsstwtke11l2qoasi',
              
                },
                {
                  url: 'https://res.cloudinary.com/dlckzs7d5/image/upload/v1657822643/YelpCamp/omff5k45qvsntukleke7.jpg',
                  filename: 'YelpCamp/omff5k45qvsntukleke7',
                  
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})



