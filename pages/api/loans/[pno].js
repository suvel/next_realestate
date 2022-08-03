import Cors from "cors";
import getLoans from "../../../helper/getLoans";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"]
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  try {
    const { pno: pageNo } = req.query;
    await runMiddleware(req, res, cors);
    const loans = await getLoans(pageNo);
    // console.log(loans);
    res.status(200).json({ data: loans });
  } catch (exe) {
    res.status(500).json();
  }
}
