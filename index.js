const express = require('express');
const {connection} = require('./config/db.js');
const { userRouter } = require('./route/user.route.js');
const { flightRouter } = require('./route/flight.route.js');
const { bookingRouter } = require('./route/booking.route.js');
const { authenticate } = require('./middleware/authenticate.js');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome')
});


app.use("/user",userRouter);
app.use(authenticate)
app.use("/flight",flightRouter);
app.use("/booking",bookingRouter);

const PORT= 4440
app.listen(PORT,async()=>{
    try {
        await connection
        console.log('Conected to DB');
    } catch (error) {
        console.log('Error while connecting to DB.')
    }
    console.log(`Server is listening on ${PORT}.`);
})
