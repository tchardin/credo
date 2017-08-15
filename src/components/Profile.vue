<template>
  <div>
    <div class="parent">
      <section class="hero is-info">
        <div class="hero-head">
          <nav class="navbar">
            <div class="navbar-brand">
              <a class="navbar-item">
                <img src="../assets/credo_logo.png" alt="Credo: own your data" height="20" width="20">
              </a>
              <a class="navbar-item" @click="signOut">
                <span class="icon" style="color: #083D77;">
                  <i class="fa fa-sign-out"></i>
                </span>
              </a>
              <div class="navbar-burger burger">
               <span></span>
               <span></span>
               <span></span>
             </div>
           </div>
         </nav>
       </div>
       <div class="hero-body">
         <figure class="image is-96x96">
           <img :src="user.profile.image[0].contentUrl">
         </figure>
         <h2 class="subtitle">{{user.username}}</h2>
       </div>
       <div class="hero-foot">
         <nav class="tabs is-boxed is-fullwidth">
           <ul>
             <li v-bind:class="{'is-active': tab === 1}" @click="toggleTab(1)">
               <a>Your Data</a>
             </li>
             <li v-bind:class="{'is-active': tab === 2}" @click="toggleTab(2)">
               <a>Permissions</a>
             </li>
           </ul>
         </nav>
       </div>
     </section>
   </div>
   <section class="menu" v-if="tab === 1">
     <div class="data-container">
       <p class="menu-label">
         General
       </p>
       <table class="table is-fullwidth">
         <thead>
           <tr>
             <th>Type</th>
             <th>Status</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           <item
            v-for="general in generalData"
            :model="general"
            :key="general.name"
            v-on:signature="addSignature(general)"
            v-on:request="requestData(general)"
            v-on:cancel="cancelVerify(general)">
          </item>
         </tbody>
       </table>
       <p class="menu-label">
         Payments
       </p>
       <table class="table is-fullwidth">
         <thead>
           <tr>
             <th>Type</th>
             <th>Status</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           <item
            v-for="payment in paymentsData"
            :model="payment"
            :key="payment.name"
            v-on:signature="addSignature(payment)"
            v-on:request="requestData(payment)"
            v-on:cancel="cancelVerify(payment)">
          </item>
         </tbody>
       </table>
     </div>
     <div class="has-text-centered">
       <a class="button is-info new-btn" @click="linkBank">Add new source</a>
     </div>
   </section>
   <permissions
    :model="allData"
    v-if="tab === 2">
    </permissions>
    <foot></foot>
  </div>
</template>

<script>
import Item from './Item'
import Permissions from './Permissions'
import Foot from './Footer'

export default {
  name: 'profile',
  props: {
    user: Object
  },
  data: function () {
    return {
      generalData: [{name: 'Address'}],
      paymentsData: this.user.payments,
      tab: 1
    }
  },
  components: {
    Item,
    Permissions,
    Foot
  },
  computed: {
    allData: function () {
      return this.generalData.concat(this.paymentsData)
    }
  },
  methods: {
    toggleTab: function (n) {
      this.tab = n
    },
    requestData: function (item) {
      this.$emit('request', item)
    },
    addSignature: function (item) {
      this.$emit('signature', item)
    },
    cancelVerify: function (item) {
      this.$emit('cancel', item)
    },
    signOut: function () {
      this.$emit('signout')
    },
    linkBank: function () {
      this.$emit('openBank')
    }
  }
}
</script>

<style lang="scss">

  .new-btn {
    margin-bottom: -30px;
  }
  img {
    border-radius: 50%;
  }
  .image {
    margin: auto;
  }
  .hero.is-info {
    background-color: #35A7FF !important;
  }
  .hero-body {
    text-align: center;
  }
  .navbar-item {
    color: black !important;
  }
  .data-container {
    padding: 1em;
    // margin-top: 310px;
  }
  @import '../../node_modules/bulma/bulma.sass';
</style>
