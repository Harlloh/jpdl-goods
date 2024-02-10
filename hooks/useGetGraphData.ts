import axios from "axios";
import moment from "moment";

export default async function getGraphData() {
  // try {
  //   // Get the start and end dates for the data range (7 days ago to today)
  //   const startDate = moment().subtract(6, 'days').startOf('day');
  //   const endDate = moment().endOf('day');
  //   // Initialize an object to aggregate the data by day
  //   const aggregatedData = {};
  //   // Create a clone of the start date to iterate over each day
  //   const currentDate = startDate.clone();
  //   // Iterate over each day in the date range
  //   while (currentDate <= endDate) {
  //     // Format the date as a string (e.g., 'Monday')
  //     const day = currentDate.format('dddd');
  //     // Initialize the aggregated data for the day with the day, date, and totalAmount
  //     aggregatedData[day] = {
  //       day,
  //       date: currentDate.format('YYYY-MM-DD'),
  //       totalAmount: 0,
  //     };
  //     // Move to the next day
  //     currentDate.add(1, 'day');
  //   }
  //   // Fetch order data from the REST API
  //   const response = await axios.get('YOUR_API_ENDPOINT', {
  //     params: {
  //       startDate: startDate.toISOString(),
  //       endDate: endDate.toISOString(),
  //       status: 'complete',
  //     },
  //   });
  //   // Calculate the total amount for each day by summing the order amounts
  //   const orders = response.data; // Adjust this based on your API response structure
  //   orders.forEach((order:any) => {
  //     const day = moment(order.createdDate).format('dddd');
  //     const amount = order.amount || 0;
  //     aggregatedData[day].totalAmount += amount;
  //   });
  //   // Convert the aggregatedData object to an array and sort it by date
  //   const formattedData = Object.values(aggregatedData).sort((a:any, b:any) =>
  //     moment(a.date).diff(moment(b.date))
  //   );
  //   // Return the formatted data
  //   return formattedData;
  // } catch (error:any) {
  //   throw new Error(error.message || 'Error fetching data from the API');
  // }
}
