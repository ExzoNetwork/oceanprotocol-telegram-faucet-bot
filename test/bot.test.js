/* eslint-disable no-undef */
/* eslint-disable no-console */
const expect = require('chai').expect
const axmock = require('axios-mock-adapter')
const axios = require('axios')
const faucetServer = require('../utility/faucet').callFaucet


const mock = new axmock(axios)

mock.onPost().reply(200, { status: 200 })

describe('callFaucet', function() {
    it('should attempt to make a post call to server and get 200 message as response', async () => {
        const address = '0x0'
        const response = await faucetServer(address, 'telegram')
        expect(response.status).to.equal(200)
    })
})