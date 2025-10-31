// Run with: node seed.js (after installing dependencies)
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/ems';
mongoose.connect(MONGO);
const EventSchema = new mongoose.Schema({ name:String, poster:String, category:String, place:String, date:String, time:String });
const Event = mongoose.model('Event', EventSchema);
const seed = async ()=>{
  await Event.deleteMany({});
  await Event.insertMany([
    { name:'Music Fiesta', poster:'https://placehold.co/600x400?text=Music', category:'Music', place:'Auditorium', date:'2025-11-10', time:'18:00' },
    { name:'Tech Talk', poster:'https://placehold.co/600x400?text=Tech', category:'Tech', place:'Hall 2', date:'2025-12-05', time:'15:00' }
  ]);
  console.log('seeded'); process.exit();
};
seed();
