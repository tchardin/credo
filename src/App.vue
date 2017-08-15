<template>
  <div id="app">
    <section class="hero is-info is-bold is-fullheight" v-if="user === null">
      <div class="hero-head">
        <header class="nav">
          <div class="container">
            <div class="nav-left">
              <span class="nav-item">
                <span>CREDO</span>
              </span>
            </div>
          </div>
        </header>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <button class="button is-info is-inverted" v-on:click="signIn">Sign in</button>
        </div>
      </div>
    </section>
    <profile
      :user="user"
      v-on:signout="signOut"
      v-on:request="item => dataRequest(item)"
      v-on:cancel="item => cancelVerify(item)"
      v-on:openBank="linkBank"
      v-on:signature="signContract"
      v-else>
    </profile>
  </div>
</template>

<script>
var blockstack = require('blockstack')
import Vue from 'vue'
import { signToken } from './authMessages.js'
import { decodeToken } from 'jsontokens'
import Profile from '@/components/Profile'

// Dummy profile data about payments
var payments = [
  {name: 'Exelon', loading: false, open: false},
  {name: 'Verizon', loading: false, open: false},
  {name: 'BCBS', loading: false, open: false}
]

// Bank statement scrapping - needs proper backend setup for authentication
var Plaid = window.Plaid
var plaidHandler = Plaid.create({
  env: 'development',
  clientName: 'Log in with Plaid',
  key: '6dbd1772306070046d42f317d42b08',
  product: ['auth', 'transactions'],
  onSuccess: function (publicToken, metadata) {
    console.log(publicToken)
    fetch('/get_access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({publicToken: publicToken})
    })
  }
})

// Blockstack storage -> the file stored on the user provided cloud storage
const STORAGE_FILE = 'payments.json'

export default {
  name: 'app',
  data: function () {
    return {
      user: null
    }
  },
  components: {
    Profile
  },
  methods: {
    // Opens the bank login interface but nothing more
    linkBank: function () {
      plaidHandler.open()
    },
    // Redirects to the Blockstack browser
    signIn: function () {
      blockstack.redirectToSignIn()
    },
    // Removes the user auth from local storage
    signOut: function () {
      blockstack.signUserOut(window.location.href)
      this.user = null
    },
    // Cancel contract
    cancelVerify: function (item) {
      this.user.payments.forEach((e) => {
        if (e.name === item.name) {
          e.open = false
        }
      })
    },
    // Sends a request to data provider
    dataRequest: function (item) {
      var vm = this
      // Give user feedback the request is being processed
      vm.user.payments.forEach((e) => {
        if (e.name === item.name) {
          e.loading = true
        }
      })
      // Do some sort of query for the data provider address here (e.g. exelon.id)

      // Cannot get user private key securely so getting the app Private Key
      const payload = {
        iat: Math.floor(new Date().getTime() / 1000),
        profile: vm.user.profile,
        pubkeys: []
      }
      const credoPrivateKey = this.user.appPrivateKey
      const token = signToken(credoPrivateKey, payload)
      const jsonToken = JSON.stringify({token: token})
      // console.log(token)
      fetch('http://ec2-52-91-31-21.compute-1.amazonaws.com/request', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: jsonToken
      })
      .then((response) => response.json())
      .then((j) => {
        var decodedRes = decodeToken(j.response)
        console.log(decodedRes)
        vm.user.payments.forEach((e) => {
          if (e.name === item.name) {
            e.open = decodedRes.payload.q_ok
            e.loading = false
          }
        })
      })
      .catch((err) => console.log(err))
    },

    // Sends agreement to contract terms
    signContract: function (item) {
      var vm = this
      const payload = {
        iat: Math.floor(new Date().getTime() / 1000),
        co: 'Exelon Contract',
        pubkeys: []
      }
      const credoPrivateKey = vm.user.appPrivateKey
      const token = signToken(credoPrivateKey, payload)
      const jsonToken = JSON.stringify({token: token})
      fetch('http://ec2-52-91-31-21.compute-1.amazonaws.com/verify', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: jsonToken
      })
      .then(res => res.json())
      .then((response) => {
        console.log(response)
        var userData = decodeToken(response.response)
        console.log(userData)
        vm.user.payments.forEach((e) => {
          if (e.name === item.name) {
            Vue.set(e, 'children', [])
            e.children.push({
              name: 'signature'
            })
            e.open = false
          }
        })
        return blockstack.putFile(STORAGE_FILE, JSON.stringify(response))
      })
      .catch((err) => console.log(err))
    }
  },
  mounted () {
    if (blockstack.isUserSignedIn()) {
      this.user = blockstack.loadUserData()
      this.user.payments = payments
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
      .then((userData) => {
        window.location = window.location.origin
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../node_modules/bulma/bulma.sass';
</style>
