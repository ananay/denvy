import fs from "fs";

/**
 * Finds all .env files in the current directory
 */
export const findEnvFiles = () => {
    const files = fs.readdirSync(".");

    // Filter out files that don't end with .env
    const envFiles = files.filter((file) => file == ".env" ||
        file == ".env.local" ||
        file == ".env.development" ||
        file == ".env.production");

    // Return the filtered list of files
    return envFiles;
}

/**
 * Read the given .env file and return its content
 * @param envFile {string} The name of the .env file
 */
export const readEnvFile = async (envFile: string) => {
    const fileContent = fs.readFileSync(envFile, 'utf-8');
    return fileContent;
}

export const getEnvFileName = async (): Promise<string> => {

    const envFiles = findEnvFiles();

    if (envFiles.length == 0) {
        console.error("❌ No .env files found in the current directory.");
        process.exit(1);
    }

    if (envFiles.length > 1) {
        console.warn(`❗ Multiple .env files found in the current directory. Choosing: ${envFiles[0]}`);
        return envFiles[0];
    }

    const envFile = envFiles[0];

    return envFile;
}