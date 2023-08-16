import depositService from "../src/redux/features/deposit/depositService";

export default function monthlyDeposit(request, response) {
  console.log('trigerring monhtly deposit creation')
  try {
    depositService.createMonthlyDeposit().then(res => {
      response.status(200).json({message: res});
    });
  } catch (error) {
    response.status(500).json({
      message: "Something Went wrong"
    });
  }
  }