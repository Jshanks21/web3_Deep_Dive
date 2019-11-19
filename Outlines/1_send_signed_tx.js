const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('') //Web3 provider or node

const account1 = '' //Account 1 address
const account2 = '' //Account 2 address

const PK1 = Buffer.from('', 'hex') //Private key without "0x" prefix
const PK2 = Buffer.from('', 'hex') //Private key without "0x" prefix

web3.eth.getTransactionCount(account2, (err, txCount) => {

  //Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account1,
    value: web3.utils.toHex(web3.utils.toWei('', 'ether')), //Amount to send in ether
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei'))
  }

  //Sign teh transaction
  const tx = new Tx(txObject, {chain: '', hardfork: ''}) //Choose network and hardfork if not default (mainnet, petersburg)
  tx.sign(PK2)

  const serializedTransaction = tx.serialize()
  const raw = '0x' + serializedTransaction.toString('hex')


  //Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash: ', txHash)
    console.log('err: ', err)
  })
})
