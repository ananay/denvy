import { generateSampleEnvFile, validateEnvFile, generateTypesFromEnvFile } from "./env";
import { getEnvFileName, readEnvFile } from "./file";

export const generateSample = async () => {

    
    const envFile = await getEnvFileName();

    console.log(`⏳ Generating .env.sample file from ${envFile} file...`); 

    const fileContent = await readEnvFile(envFile);
    validateEnvFile(fileContent);

    const generatedSamplEnvFileContents = generateSampleEnvFile(fileContent);

    // Write the generated sample .env file to the current directory
    const outputSampleEnvFile = Bun.file(".env.sample");
    Bun.write(outputSampleEnvFile, generatedSamplEnvFileContents);

    console.log(`✅ Generated .env.sample file successfully.`);
}

export const validateEnv = async () => {
    // Find the .env files in the current directory
    const envFile = await getEnvFileName();

    console.log(`⏳ Validating ${envFile} file...`); 

    // Read the .env file
    const envFileRef = Bun.file(envFile);
    const fileContent = await envFileRef.text();

    validateEnvFile(fileContent);
    console.log(`✅ ${envFile} file is valid.`);

}


export const generateTypes = async () => {
    // Find the .env files in the current directory
    const envFile = await getEnvFileName();

    console.log(`⏳ Generating typescript types from ${envFile} file...`); 

    // Read the .env file
    const envFileRef = Bun.file(envFile);
    const fileContent = await envFileRef.text();

    const generatedTypes = generateTypesFromEnvFile(fileContent);

    console.log(generatedTypes);
}