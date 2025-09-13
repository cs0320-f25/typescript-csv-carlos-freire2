import * as fs from "fs";
import * as readline from "readline";
import { z, ZodType } from "zod";

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @param schema Zod schema describing each row
 * @param hasHeaderRow Whether the CSV includes a header row
 * @returns Promise with parsed results:
 * {
 *   data: T[]; // all successfully validated rows
 *   errors: { row: number; raw: string[]; error: z.ZodError }[]; // validation failures
 *   headers: string[]; // empty if hasHeaderRow=false
 * }
 */
export async function parseCSV<T>(path: string, schema: ZodType<T>, hasHeaderRow: boolean): Promise<{
  data: T[];
  errors: { row: number; raw: string[]; error: z.ZodError }[];
  headers: string[];
}> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let data: T[] = [];
  let errors: { row: number; raw: string[]; error: z.ZodError }[] = [];
  let headers: string[] = [];

  let rowIndex = 0;
  for await (const line of rl) {
    rowIndex++;
    const values = line.split(",").map((v) => v.trim());

    if (rowIndex === 1 && hasHeaderRow) {
      headers = values;
      continue;
    }

    // If header row is present, convert array into an object keyed by headers
    const input = hasHeaderRow
      ? Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]))
      : values;

    const parsed = schema.safeParse(input);
    if (parsed.success) {
      data.push(parsed.data);
    } else {
      errors.push({ row: rowIndex, raw: values, error: parsed.error });
    }
  }

  return { data, errors, headers };
}