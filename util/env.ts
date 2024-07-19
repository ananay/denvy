/**
 * All env file related functions
 */

/**
 * Gets all the env vars from the given .env file content
 * @param fileContent – The content of the .env file
 * @returns {Map<string, string>} A map of key-value pairs
 */
export const getVars = (fileContent: string) => {
    // Split into lines and ignore lines that start with #, and also ignore empty lines
    const vars = fileContent.split("\n").filter((line) => {
        if (line.startsWith("#") || line.trim() == "") {
            return false;
        }
        return true;
    });

    // Split the lines into key-value pairs
    const keyValuePairs = vars.map((line) => line.split("="));

    // Create a map of key-value pairs
    // @ts-ignore
    const envMap = new Map(keyValuePairs);

    return envMap;
}


/**
 * Generates a sample .env file based on the given file content
 * @param fileContent {string} The content of the .env file
 */
export const generateSampleEnvFile = (fileContent: string) => {
    // Split the file content into lines
    const lines = fileContent.split("\n");

    // Filter out lines that start with # or are empty
    const sampleEnvFile = lines.map((line) => {

        if (line.startsWith("#") || line.trim() == "") {
            return line;
        }

        const [splitKey, value] = line.split("=");
        const key = splitKey.trim();

        if (!value) {
            return `${key}=""`;
        }

        // Handle case: `ABC="123"`
        if ((value.startsWith("\"") && value.endsWith("\"") ||
            value.startsWith("'") && value.endsWith("'"))
        ) {
            return `${key}=""`;
        }

        // Handle case: `ABC="123" # Comment`
        if (value.startsWith("\"") && !value.endsWith("\"")) {
            const valueSplit = value.split("\"")
            if (valueSplit.length >= 3) {
                let extraInfo = valueSplit[2];
                return `${key}=""${extraInfo}`;
            }
            return `${key}=""`;
        }

        // Handle case: `ABC=123 # Comment`
        if (!value.startsWith("\"") && !value.startsWith("'")) {
            if (value.includes("#")) {
                const comment = value.split("#")[1];
                return `${key}="" # ${comment}`;
            }
            return `${key}=""`;
        }

    }).join("\n");

    return sampleEnvFile;
}


/**
 * Validates the given .env file content
 * @param fileContent {string} The content of the .env file
 */
export const validateEnvFile = (fileContent: string, ignoreErrors: boolean = false) => {
    // Split the file content into lines
    const lines = fileContent.split("\n");
    let currentLine = 0;
    for (const line of lines) {
        currentLine++;
        // Skip empty lines and lines starting with #
        if (line.startsWith("#") || line.trim() == "") {
            continue;
        }
        // Check if the env var is valid  using ^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)\s*$
        if (!line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)\s*$/)) {
            console.error(`Invalid line ${currentLine}: ${line}`);
            if (!ignoreErrors) {
                process.exit(1);
            }
        }
    }
}

export const generateTypesFromEnvFile = (fileContent: string) => {
    const vars = getVars(fileContent);
    const keys = Array.from(vars.keys());

    const typeDef = `export type EnvVars = {
        ${keys.map((key) => `${key}: string;`).join("\n\t")}
    }`;
    return typeDef;

}