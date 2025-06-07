import 'dotenv/config'
import multicastdns from 'multicast-dns'
import exitHook from 'exit-hook'

const defaultIP = '127.0.0.1'
const defaultHost = 'test.local'

const ip: string = process.env.IP ?? defaultIP
const hosts: string = process.env.HOST ?? defaultHost

// clean up and convert hosts into an array
const hostlist: Array<string> = hosts
	.replaceAll(' ', '')
	.toLowerCase()
	.split(',')

const mdns = multicastdns()

console.log(`mdns listening for: ${hosts}`)

mdns.on('query', (query: any) => {
	const name = query.questions[0].name
	console.log(`query: ${name}`)

	if (hostlist.indexOf(name) > -1) {
		console.log(`responding to: ${name}`)
		mdns.respond([
			{ name: name + '.', type: 'A', data: ip }
		])
	}
})

exitHook(signal => {
	mdns.destroy()
})