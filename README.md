# Weather CLI

## Overview

The Weather CLI is a command-line interface tool built using nodejs and typescript that provides weather information for a specified location. It leverages data from [OpenWeatherMap](https://openweathermap.org/) API to deliver current, hourly, and daily weather forecasts.

## Features

- Get current weather information including temperature, conditions, and more.
- Retrieve hourly forecasts for up to 48 hours.
- Access daily forecasts for up to 8 days.
- Set and manage API keys for weather and [locationIQ](https://my.locationiq.com/dashboard/login?ref=locationiq) geocode services.

## Installation

```bash
npm install -g weather-cli
```

## Usage

### Running the project locally

- Clone the project
- `cd <rootdir>` and run `npm install`
- Run `--set-key-weather <key>` to set your [OpenWeatherMap](https://openweathermap.org/) api key
- Run `--set-key-geocode` to set your [locationIQ](https://my.locationiq.com/dashboard/login?ref=locationiq) api key
- Run `ts-node ./src/cli.ts <command>`
  - Alternatively to use the `weather-cli` command locally, in the root directory run `npm link` to globally install the package (don't forget to run `npm unlink` when you're done)

### All available commands

The Weather CLI accepts a maximum of 2 location inputs eg `weather-cli paris france` and supports the following commands:

- `-f` or `--farhenheit`: Get temperature in Farhenheit.
- `-c` or `--celsius`: Get temperature in Celsius.
- `-h` or `--help`: Display help information.
- `-cr` or `--current`: Get current weather.
- `-mn` or `--minutely`: Get weather forecast by the minute.
- `-hr` or `--hourly`: Get hourly weather forecast.
- `-dy` or `--daily`: Get daily weather forecast.
- `-s` or `--stat`: Get additional weather statistics.
- `--set-c` or `--set-key-geocode`: Set Geocode API key.
- `--set-w` or `--set-key-weather`: Set Weather API key.

To use a command, run `weather-cli` followed by the desired command and additional options.

#### Examples

```bash
weather-cli --help
```

![help command](https://res.cloudinary.com/payne/image/upload/v1695475560/chingu%20readme%20images/help-cmd.png)

##### Get current forecase

```bash
weather-cli lagos -cr
```

![current command selection](https://res.cloudinary.com/payne/image/upload/v1695475673/chingu%20readme%20images/current-command-select.png)
![current command result](https://res.cloudinary.com/payne/image/upload/v1695475740/chingu%20readme%20images/current-command-result.png)

##### Get hourly forecast(48hrs)

```bash
weather-cli paris france -hr --stat
```

![hourly command result](https://res.cloudinary.com/payne/image/upload/v1695541011/chingu%20readme%20images/hour-command-result.png)

##### Get daily forecasse(8days)

```bash
weather-cli chicago -dy
```

![daily command result](https://res.cloudinary.com/payne/image/upload/v1695541885/chingu%20readme%20images/daily-command-result.png)

## Configuration

The CLI tool requires API keys for both OpenWeather and locationIQ geocode services. Use the `set-api-key-weather <key>` and `set-api-key-geocode <key>` commands to configure these keys.

## Dependencies

##### DevDependencies

- @types/node
- nodemon
- ts-node
- typescript

##### Dependencies

- dotenv
- @inquirer/select

## To do

- Add unit tests
- Implement native cli select feature
- Implement CI/CD pipeline using github actions
- Implmenet feature to manage api keys
- Add more descriptive error messages
- Add loading spinner
- Refactor
