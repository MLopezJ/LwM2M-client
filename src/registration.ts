import coap from 'coap'
import { type CoapMethod } from 'coap-packet'

type registrationParams = {
	deviceName: string
	lifetime: string
	biding: string
	lwm2mv: string
}

/**
 * Client Registration operation from Register interface
 */
export const registration = async (
	_: registrationParams,
): Promise<{ socketPort: number }> => {
	console.log('\nClient Registration operation from Register interface: start')
	const host = 'eu.iot.avsystem.cloud'
	const query = `ep=${_.deviceName}&lt=${_.lifetime}&lwm2m=${_.lwm2mv}&b=${_.biding}`

	const params = {
		host: host,
		port: 5683,
		pathname: '/rd',
		method: 'POST' as CoapMethod,
		options: {
			'Content-Format': 'application/link-format',
		},
		query,
	}

	// bracket format
	const objects =
		'<1/0>, <3/0>'

	/**
	 * SenML JSON
	 * @see https://www.openmobilealliance.org/release/LightweightM2M/V1_1_1-20190617-A/OMA-TS-LightweightM2M_Core-V1_1_1-20190617-A.pdf pag 71
	 */
	const SenMLJson = '110'

	/**
	 * SenML CBOR
	 * @see https://www.openmobilealliance.org/release/LightweightM2M/V1_1_1-20190617-A/OMA-TS-LightweightM2M_Core-V1_1_1-20190617-A.pdf pag 71
	 */
	const SenMLCbor = '112'

	/**
	 * JSON
	 * @see https://www.openmobilealliance.org/release/LightweightM2M/V1_1_1-20190617-A/OMA-TS-LightweightM2M_Core-V1_1_1-20190617-A.pdf pag 71
	 */
	const json = '11543'

	const dataFormatId = `${json},${SenMLJson},${SenMLCbor}`
	const payload = `</>;ct=${dataFormatId};hb,${objects}`

	const agent = new coap.Agent({ type: 'udp4' })
	const handshakeRequest = agent.request(params).end(payload)

	const serverResponse = new Promise<coap.IncomingMessage>(
		(resolve, reject) => {
			const t = setTimeout(reject, 10 * 1000)
			handshakeRequest.on('response', (response) => {
				clearTimeout(t)
				if (response.code === '2.01' || response.code === '2.05') {
					return resolve(response)
				}
				return reject(new Error('Server does not accept the request'))
			})
		},
	)

	const response = await serverResponse

	const socketPort = response.outSocket?.port

	console.log('\nClient Registration operation from Register interface: end')
	if (socketPort === undefined) {
		throw new Error(`Socket connection is not stablish`)
	}

	return { socketPort }
}
