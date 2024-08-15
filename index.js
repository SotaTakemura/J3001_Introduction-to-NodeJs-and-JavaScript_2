const express = require('express');
const { error } = require('node:console');
const path = require('node:path');
const fetch = require('node-fetch'); 
const app = express();


const ApiToken="<ここにアクセストークンを入力>"



const logMiddleware = (req, res, next) => {
  console.log(req.method, req.path);
  next();
};

app.use('/static', express.static(path.join(__dirname, 'public')));


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

const jsonFilePath="https://api.odpt.org/api/v4/odpt:FlightInformationDeparture?odpt:operator=odpt.Operator:ANA&acl:consumerKey="+ApiToken;
const ArrjsonFilePath="https://api.odpt.org/api/v4/odpt:FlightInformationArrival?odpt:operator=odpt.Operator:ANA&acl:consumerKey="+ApiToken;


async function fetchJson(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        throw error;
    }
}
async function fetchDepartureAndArrivalData() {
    try {
        const [departureData, arrivalData] = await Promise.all([
            fetchJson(jsonFilePath),
            fetchJson(ArrjsonFilePath)
        ]);
        return { departureData, arrivalData };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

/*
app.post('/api/number', express.json(), async (req, res) => {
    const number = req.body.number;
    console.log('Received number:', number);

    try {
        const data = await fetchJson();

        const flightData = data.find(item => item['odpt:flightNumber'].includes(number));

        if (flightData) {
            res.json(flightData);
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});*/

app.post('/api/number', express.json(), async (req, res) => {
    const number = req.body.number;
    console.log('Received number:', number);

    try {
        const { departureData, arrivalData } = await fetchDepartureAndArrivalData();

        const departureFlightData = departureData.find(item => item['odpt:flightNumber'].includes(number));

        const arrivalFlightData = arrivalData.find(item => item['odpt:flightNumber'].includes(number));

        if (departureFlightData || arrivalFlightData) {
            res.json({
                departure: departureFlightData || 'No departure data found',
                arrival: arrivalFlightData || 'No arrival data found',
            });
        } else {
            res.status(404).json({ message: 'Flight not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});



async function main() {
  app.post('/api/number', express.json(), (req, res) => {
    const number = req.body.number;
    console.log('Received number:', number);

    res.json({ receivedNumber: number });
    });

  app.get('/user/:id', logMiddleware, (req, res) => {
    res.status(200).send(req.params.id);
  });

  app.get('/thank', (req, res) => {
    res.status(200).send('thankyou\n');
  });

  app.get('/', logMiddleware, async (req, res) => {

    res.render(path.resolve(__dirname, 'views/homes.ejs'));
  });

  app.get('/flightnumber', logMiddleware, async (req, res) => {

    res.render(path.resolve(__dirname, 'views/index.ejs'));
  });

  
  app.listen(3000, () => {
    console.log('start listening');
  });
}

main();
