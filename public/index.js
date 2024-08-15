window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('.send-number').addEventListener('click', (event) => {
        const numberValue = document.querySelector('.number').value;
        alert(numberValue);

        fetch('/api/number', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number: numberValue })
        })
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('.flight-info-table tbody');
            tableBody.innerHTML = ''; // Clear the table content

            // 出発と到着データの結合
            if (data.departure || data.arrival) {
                const newRow = document.createElement('tr');
                
                // 出発データ
                const depAirline = data.departure ? data.departure['odpt:airline'].split(':').pop() : '-';
                const depOperator = data.departure ? data.departure['odpt:operator'].split(':').pop() : '-';
                const depFlightNumber = data.departure ? data.departure['odpt:flightNumber'] : '-';
                const depDepartureAirport = data.departure ? data.departure['odpt:departureAirport'].split(':').pop() : '-';
                const depFlightStatus = data.departure ? data.departure['odpt:flightStatus'].split(':').pop() : '-';
                const depEstimatedDepartureTime = data.departure ? data.departure['odpt:estimatedDepartureTime'] : '-';
                const depScheduledDepartureTime = data.departure ? data.departure['odpt:scheduledDepartureTime'] : '-';
                const depActualDepartureTime = data.departure ? data.departure['odpt:actualDepartureTime'] : '-';
                const depDestinationAirport = data.departure ? data.departure['odpt:destinationAirport'].split(':').pop() : '-';
                const depAircraftType = data.departure ? data.departure['odpt:aircraftType'] : '-';
                
                // 到着データ
                const arrAirline = data.arrival ? data.arrival['odpt:airline'].split(':').pop() : '-';
                const arrOperator = data.arrival ? data.arrival['odpt:operator'].split(':').pop() : '-';
                const arrFlightNumber = data.arrival ? data.arrival['odpt:flightNumber'] : '-';
                const arrDepartureAirport = data.arrival ? data.arrival['odpt:originAirport'].split(':').pop() : '-';
                const arrFlightStatus = data.arrival ? data.arrival['odpt:flightStatus'].split(':').pop() : '-';
                const arrEstimatedArrivalTime = data.arrival ? data.arrival['odpt:estimatedArrivalTime'] : '-';
                const arrScheduledArrivalTime = data.arrival ? data.arrival['odpt:scheduledArrivalTime'] : '-';
                const arrActualArrivalTime = data.arrival ? data.arrival['odpt:actualArrivalTime'] : '-';
                const arrDestinationAirport = data.arrival ? data.arrival['odpt:arrivalAirport'].split(':').pop() : '-';
                const arrAircraftType = data.arrival ? data.arrival['odpt:aircraftType'] : '-';

                // 結合して表示
                newRow.innerHTML = `
                    <td>${depAirline || arrAirline}</td>
                    <td>${depOperator || arrOperator}</td>
                    <td>${depFlightNumber || arrFlightNumber}</td>
                    <td>${depDepartureAirport || arrDepartureAirport}</td>
                    <td>${depFlightStatus || arrFlightStatus}</td>
                    <td>${depEstimatedDepartureTime}</td>
                    <td>${depScheduledDepartureTime}</td>
                    <td>${depActualDepartureTime}</td>
                    <td>${depDestinationAirport}</td>
                    <td>${arrEstimatedArrivalTime}</td>
                    <td>${arrScheduledArrivalTime}</td>
                    <td>${arrActualArrivalTime}</td>
                    <td>${depAircraftType || arrAircraftType}</td>
                `;
                tableBody.appendChild(newRow);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
