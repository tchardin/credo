<template>
  <tr>
    <th>{{model.name}}</th>
    <td :class="[isVerified ? 'verified' : 'unverified']">{{isVerified ? 'Verified' : 'Unverified'}}</td>
    <td>
      <a class="button is-info check-button" v-if="isVerified" disabled>
        <span class="icon is-small">
          <i class="fa fa-check"></i>
        </span>
      </a>
      <a class="button is-info" :class="{'is-loading': model.loading}" v-else @click="sendRequest">Verify</a>
    </td>
    <modal
      :model="model"
      :open="model.open"
      v-on:signature="addSignature"
      v-on:cancel="cancelVerify">
    </modal>
  </tr>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'item',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  components: {
    Modal
  },
  computed: {
    isVerified: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    sendRequest: function () {
      this.$emit('request', this.model.name)
    },
    cancelVerify: function () {
      this.$emit('cancel')
    },
    addSignature: function () {
      if (!this.isVerified) {
        this.$emit('signature')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .checkbox {
    font-size: 12px;
  }
  .verified {
    color: #00C96D;
  }
  .unverified {
    color: #FF5964;
  }
  .check-button {
    width: 70px;
  }
</style>
