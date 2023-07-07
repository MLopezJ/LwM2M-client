# Minimalist LwM2M Client

[![Test and Release](https://github.com/MLopezJ/minimalist-lwm2m-client/actions/workflows/test-and-release.yaml/badge.svg)](https://github.com/MLopezJ/minimalist-lwm2m-client/actions/workflows/test-and-release.yaml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![Mergify Status](https://img.shields.io/endpoint.svg?url=https://api.mergify.com/v1/badges/NordicSemiconductor/minimalist-lwm2m-client)](https://mergify.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)
[![ESLint: TypeScript](https://img.shields.io/badge/ESLint-TypeScript-blue.svg)](https://github.com/typescript-eslint/typescript-eslint)


a minimal LwM2M client which performe the following operations:

* `Client registration` from `Register` interface (triggered by the client)
* `Discover` from `Dev Mang & Serv Enab` interface (triggered by the server)
* `Read` from `Dev Mang & Serv Enab` interface (triggered by the server)
* `Send` from `Information Reporting` interface (triggered by the client)

## Installation

```
npm install
```

## Enviroment variables

Create a `.env` file in the root of the proyect with the following keys

```
deviceName=
port=
host=
lifetime=
lwm2mV=
biding=
```

Where 

* `deviceName` should be the name of the device
* `port` should be the port of the LwM2M server. `5683`, for example.
* `host` should be the hostname. `eu.iot.avsystem.cloud`, for example.
* `lifetime` should be the lifetime desire for the connection between the client and the server. It should be in seconds, `3600` for example.
* `lwm2mV` should be the LwM2M version used by the client. `1.1`, for example.
* `biding` should be the type of binding that the client supports for communication with the server. `U` for example, which stands for UDP.

## Test

```
npm test
```


## Execution

```
// npx tsx src/index.ts
// TODO
```

## Usage
TODO
