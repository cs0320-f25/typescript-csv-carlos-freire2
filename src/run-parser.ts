import { parseCSV } from "./basic-parser";
import { z } from "zod";
/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/people.csv"; // update with your actual file name

async function main() {

  const personSchema = z.object({
  name: z.string(),
  age: z.coerce.number(),
});

const results = await parseCSV(DATA_FILE, personSchema, true);

  // Print headers
  console.log("Headers:", results.headers);

  // Print valid rows
  console.log("\nValid rows:");
  for (const record of results.data) {
    console.log(record);
  }

  // Print errors
  console.log("\nErrors:");
  for (const e of results.errors) {
    console.log(`Row ${e.row} failed:`, e.raw);
    console.log("Zod issues:", e.error.issues);
  }
}

main();