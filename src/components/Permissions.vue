<template>
  <section class="menu">
    <div class="data-container">
      <p class="menu-label">
        Manage who can access your data
      </p>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Scope</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="authorized.length === 0">
            <td>
              No authorizations
            </td>
          </tr>
          <tr v-for="data in authorized">
            <td>{{ data.name }}.id</td>
            <td>
              <span
                class="tag is-success"
                v-for="scopes in data.scope">
                {{scopes}}
              </span>
            </td>
            <td>
              <a class="button is-info" @click="revoke">Revoke</a>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="menu-label">
        Available data
      </p>
      <ul class="menu-list">
        <li v-for="data in verifiedData">
          <label class="checkbox">
            <input
            type="checkbox"
            :id="data.name"
            :value="data.name"
            v-model="selected">
            {{data.name}}
          </label>
        </li>
      </ul>
      <hr>
      <div class="container has-text-centered">
        <label class="label">Grant access to:</label>
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" v-model="idInput" placeholder="Enter name">
          </p>
          <p class="control">
            <a class="button is-static">
              .id
            </a>
          </p>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-info" @click="authorize">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'permissions',
  props: {
    model: Array
  },
  data: function () {
    return {
      selected: [],
      verifiedData: [],
      idInput: '',
      authorized: []
    }
  },
  methods: {
    authorize: function () {
      this.authorized.push({
        name: this.idInput,
        scope: this.selected
      })
    },
    revoke: function () {
      this.authorized.pop()
    }
  },
  mounted () {
    for (var i = 0; i < this.model.length; i++) {
      if (this.model[i].children && this.model[i].children.length) {
        this.verifiedData.push(this.model[i])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  padding-top: 1em;
}
.data-container {
  padding: 1em;
  // margin-top: 310px;
}
.checkbox {
  padding: 0.5em 0.75em;
}
.menu-label {
  padding: 1.5em;
}
.control {
  text-align: center;

}
.field.has-addons {
  justify-content: center;
}
</style>
