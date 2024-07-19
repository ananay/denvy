#! /usr/bin/env node

import { program } from "commander";
import { generateSample, generateTypes, validateEnv } from "./util/actions";
import figlet from "figlet";

const main = async () => {

    program
        .name("denvy")
        .description("Manage environment variables and .env files")
        .usage("[command] [options]")
        .version("0.0.1")

    program
        .command('sample')
        .alias('s')
        .description('Generates a sample .env file based on the current .env file')
        .action(generateSample);


    program
        .command('types')
        .alias('t')
        .description('Generates the typescript types for the current .env file')
        .action(generateTypes);

    program
        .command('validate')
        .alias('v')
        .description('Validates the current .env file')
        .action(validateEnv);

    console.log(figlet.textSync("Denvy"));

    program.parse(process.argv);

}

main();