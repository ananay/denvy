import { promises as fs } from "fs";
import { generateCheckFunctionFromEnvFile, generateSampleEnvFile, generateTypesFromEnvFile, validateEnvFile } from "./env";
import { findSampleEnvFile, getEnvFileName, readEnvFile } from "./file";

export const generateSample = async () => {
    const envFile = await getEnvFileName();

    console.log(`⏳ Generating .env.sample file from ${envFile} file...`); 

    const fileContent = await readEnvFile(envFile);
    validateEnvFile(fileContent);

    const generatedSamplEnvFileContents = generateSampleEnvFile(fileContent);

    // Write the generated sample .env file to the current directory
    await fs.writeFile(".env.sample", generatedSamplEnvFileContents);

    console.log(`✅ Generated .env.sample file successfully.`);
}

export const validateEnv = async () => {
    // Find the .env files in the current directory
    const envFile = await getEnvFileName();

    console.log(`⏳ Validating ${envFile} file...`); 

    // Read the .env file
    const fileContent = await fs.readFile(envFile, "utf-8");

    validateEnvFile(fileContent);
    console.log(`✅ ${envFile} file is valid.`);
}

export const generateTypes = async () => {
    // Find the .env files in the current directory
    const envFile = await getEnvFileName();

    console.log(`⏳ Generating typescript types from ${envFile} file...`); 

    // Read the .env file
    const fileContent = await fs.readFile(envFile, "utf-8");

    const generatedTypes = generateTypesFromEnvFile(fileContent);

    // Write the generated types to the current directory
    await fs.writeFile("env.ts", generatedTypes);

    console.log(`✅ Generated env.ts file successfully.`);
    console.log("=========================================")
    console.log("")
    console.log("Use the following command to import the types:")
    console.log(`import env from "./env";`)
    console.log("")
    console.log("=========================================")
}

export const generateTypesAndCheckRequired = async () => {
    // Find the .env.sample file in the current directory
    const sampleEnvFile = findSampleEnvFile();

    if (!sampleEnvFile) {
        console.log("❌ No .env.sample file found in the current directory. Please use `denvy s` to generate a sample .env file.");
        process.exit(1);
    }

    console.log(`⏳ Generating a function to check if all required env vars are set...`);

    // Read the .env file
    const fileContent = await fs.readFile(sampleEnvFile, "utf-8");

    const checkFunction = generateCheckFunctionFromEnvFile(fileContent);

    const generatedTypes = generateTypesFromEnvFile(fileContent);

    // Write the generated types to the current directory
    await fs.writeFile("env.ts", generatedTypes + '\n' + checkFunction);

    console.log(`✅ Generated env.ts file with checks and types successfully.`);
    console.log("=========================================")
    console.log("")
    console.log("// Use the following command to import the types:")
    console.log(`import env, { checkRequiredEnvVars } from "./env";`)
    console.log("")
    console.log("")
    console.log("// Run checks before using the env variables:")
    console.log(`checkRequiredEnvVars();`)
    console.log("")
    console.log("=========================================")

}