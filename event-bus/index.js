import express from 'express';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(express.json());

const servicePorts = [4001, 4002, 4004];

app.post('/events', async (req, res) => {
  const event = req.body;

  console.log(`(${process.pid}) Event Bus (Received Event) ${event.type}`);

  for (const port of servicePorts) {
    try {
      console.log(
        `(${process.pid}) Event Bus (Sending Event to ${port}) ${event.type}`
      );

      await fetch(`http://${name}:${port}/events`, {
        method: 'POST',
        body: JSON.stringify(event),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.log(err);
    }
  }

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log(`(${process.pid}) Event Bus Listening on 4005`);
});


// const servicePorts = [
//   {port: 4001, name: "genre"}, 
//   {port: 4002, name: "query"},
//   {port: 4004, name: "detail"},
// ];

// for (const {port, name} of servicePorts) {
//   try {
//     console.log(
//       `(${process.pid}) Event Bus (Sending Event to ${port}) ${event.type}`
//     );

//     await fetch(`http://${name}:${port}/events`, {

// const servicePorts = [4001, 4002, 4004];

// app.post('/events', async (req, res) => {
//   const event = req.body;

//   console.log(`(${process.pid}) Event Bus (Received Event) ${event.type}`);

//   for (const port of servicePorts) {
//     try {
//       console.log(
//         `(${process.pid}) Event Bus (Sending Event to ${port}) ${event.type}`
//       );