#! /usr/bin/env node

import { program } from "commander";
import figlet from "figlet";
import { generateSample, generateTypesAndCheckRequired, validateEnv } from "./util/actions";

const main = async () => {

    program
        .name("denvy")
        .description("Manage environment variables and .env files")
        .usage("[command] [options]")
        .version("0.0.1-alpha.6")

    program
        .command('sample')
        .alias('s')
        .description('Generates a sample .env file based on the current .env file')
        .action(generateSample);

    program
        .command('types')
        .alias('t')
        .description('Generates typescript types and usage check function for the current .env file')
        .action(() => {
            generateTypesAndCheckRequired();
        });

    program
        .command('sample-types')
        .alias('st')
        .description('Generates .env.sample, typescript types and usage check function for the current .env file')
        .action(async () => {
            await generateSample();
            await generateTypesAndCheckRequired();
        });

    program
        .command('validate')
        .alias('v')
        .description('Validates the current .env file')
        .action(validateEnv);

    console.log(figlet.textSync("Denvy"));

    program.parse(process.argv);

}

main();