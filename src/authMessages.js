import {
  SECP256K1Client,
  TokenSigner
 } from 'jsontokens'

export function signToken (privateKey, payload) {
  const publicKey = SECP256K1Client.derivePublicKey(privateKey)
  payload.pubkeys = [publicKey]

  const tokenSigner = new TokenSigner('ES256k', privateKey)
  return tokenSigner.sign(payload)
}
