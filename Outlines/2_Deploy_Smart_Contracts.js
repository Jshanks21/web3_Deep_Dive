const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('') //Web3 provider or node

const account1 = '' //Account 1 address

const PK1 = Buffer.from('', 'hex') //Private key without "0x" prefix


//Get tx count for nonce
 web3.eth.getTransactionCount(account1, (err, txCount) => {

//Smart contract data
  const data = ''

//Create transaction object
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000), //Raise this
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    data: data
  }

//Sign the transaction
  const tx = new Tx(txObject, {chain: '', hardfork: ''}) //Choose network and hardfork if not default (mainnet, petersburg)
  tx.sign(PK1)

  const serializedTransaction = tx.serialize()
  const raw = '0x' + serializedTransaction.toString('hex')

//Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash: ', txHash, 'err: ', err)
  })
//Use txHash to find contract on Etherscan
})
