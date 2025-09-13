import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV parses people.csv with headers", async () => {
  const personSchema = z.object({
    name: z.string(),
    age: z.coerce.number(),
  });

  const results = await parseCSV(PEOPLE_CSV_PATH, personSchema, true);

  // headers are correct
  expect(results.headers).toEqual(["name", "age"]);

  // valid rows
  expect(results.data).toEqual([
    { name: "Alice", age: 23 },
    { name: "Charlie", age: 25 },
    { name: "Nim", age: 22 },
  ]);

  // errors: Bob should fail
  expect(results.errors).toHaveLength(1);
  expect(results.errors[0].row).toBe(3); // Bob is on row 3 (after header)
  expect(results.errors[0].raw).toEqual(["Bob", "thirty"]);
});

test("parseCSV returns consistent object shape", async () => {
  const personSchema = z.object({
    name: z.string(),
    age: z.coerce.number(),
  });

  const results = await parseCSV(PEOPLE_CSV_PATH, personSchema, true);

  expect(results).toHaveProperty("data");
  expect(results).toHaveProperty("errors");
  expect(results).toHaveProperty("headers");
  expect(Array.isArray(results.data)).toBe(true);
  expect(Array.isArray(results.errors)).toBe(true);
  expect(Array.isArray(results.headers)).toBe(true);
});
