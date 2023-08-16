import cronService from "../src/redux/features/cronService";

export default function monthlyDeposit(request, response) {
  console.log('trigerring monhtly deposit creation')
  try {
    cronService.createMonthlyDeposit().then(res => {
      response.status(200).json({message: res});
    });
  } catch (error) {
    response.status(500).json({
      message: "Something Went wrong"
    });
  }
  }