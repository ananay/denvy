import { generateSampleEnvFile, validateEnvFile, generateTypesFromEnvFile } from "./env";
import { getEnvFileName, readEnvFile } from "./file";
import { promises as fs } from "fs";

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

    console.log(generatedTypes);
}