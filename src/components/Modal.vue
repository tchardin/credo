<template>
  <div class="modal" :class="{'is-active': open}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{model.name}} Contract</p>
        <button class="delete" @click="cancelVerify"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <figure>
            <img src="../assets/contract.png">
          </figure>
          <h1>Terms of Verification</h1>
          <blockquote>
            <h2>{{model.name}} Contract</h2>
            <dl>
              <dt>Payment:</dt>
              <dd>{{model.name}} will get paid $2.00 per data access & update.</dd>
              <dt>Data:</dt>
              <dd>{{model.name}} will digitally sign and post the payment history associated with your {{model.name}} account to your personal database.</dd>
              <dt>Access:</dt>
              <dd>{{model.name}} will have read and write access to the Exelon data in your personal database.</dd>
            </dl>
          </blockquote>
          <label class="checkbox">
            <input type="checkbox">
            I accept full legal responsibility for the data that {{model.name}} posts to my personal database.
          </label>
          <label class="checkbox">
            <input type="checkbox">
            I understand that once {{model.name}} posts my payment data to my database, I am responsible for how it is used.
          </label>
          <label class="checkbox">
            <input type="checkbox">
            I understand that tampering with my {{model.name}} data to deceive a third party is fraud, which is a federal crime.
          </label>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" @click="addSignature">Submit</a>
        <a class="button" @click="cancelVerify">Cancel</a>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    model: Object,
    open: Boolean
  },
  methods: {
    addSignature: function () {
      this.$emit('signature')
    },
    cancelVerify: function () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
  .checkbox {
    font-size: 12px;
  }
</style>
