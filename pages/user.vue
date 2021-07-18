<template>
  <div class="category-table-section" style="width: 80%">
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="10"
      class="elevation-1 mt-5"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
         
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                @click="newJob()"
              >
                New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">User Registry</span>
              </v-card-title>

              <form>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="First Name"
                          v-model="$v.editedItem.firstName.$model"
                          :error-messages="firstNameValidation"
                          required
                          @input="$v.editedItem.firstName.$touch()"
                          @blur="$v.editedItem.firstName.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Last Name"
                          v-model="$v.editedItem.lastName.$model"
                          :error-messages="lastNameValidation"
                          required
                          @input="$v.editedItem.lastName.$touch()"
                          @blur="$v.editedItem.lastName.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="email"
                          v-model="$v.editedItem.email.$model"
                          :error-messages="emailValidation"
                          required
                          @input="$v.editedItem.email.$touch()"
                          @blur="$v.editedItem.email.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="password"
                          v-model="$v.editedItem.password.$model"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show ? 'text' : 'password'"
                          :error-messages="passwordValidation"
                          required
                          @input="$v.editedItem.password.$touch()"
                          @blur="$v.editedItem.password.$touch()"
                           @click:append="show = !show"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  middleware: 'authenticated',

  async created() {
    await this.$store.dispatch('getItems', this.getMainObject());
    this.loading = false;
  },
  computed: {
    ...mapState(['users' ]),

    firstNameValidation() {
      const errors = []
      if (!this.$v.editedItem.firstName.$dirty) return errors
      !this.$v.editedItem.firstName.required &&
        errors.push('firstName is required.')
      return errors
    },
    lastNameValidation() {
      const errors = []
      if (!this.$v.editedItem.lastName.$dirty) return errors
      !this.$v.editedItem.lastName.required &&
        errors.push('lastName is required.')
      return errors
    },
    emailValidation() {
      const errors = []
      if (!this.$v.editedItem.email.$dirty) return errors
      !this.$v.editedItem.email.required && errors.push('email is required.')
      return errors
    },
    passwordValidation() {
      const errors = []
      if (!this.$v.editedItem.password.$dirty) return errors
      !this.$v.editedItem.password.required && errors.push('password is required.')
      return errors
    }
  },
  data() {
    return {
      show: false,
      loading:true,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'First Name', align: 'center', value: 'firstName' },
        { text: 'Last Name', align: 'center', value: 'lastName' },
        { text: 'email', align: 'center', value: 'email' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      defaultItem: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
    }
  },
  validations: {
    editedItem: {
      firstName: { required },
      lastName: { required },
      email: { required },
      password: { required }
    },
  },
 
  methods: {
    newJob() {},
    editItem(item) {
      console.log('edit item', item)
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('deleteItem', this.getMainObject())
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    getMainObject() {
      return {
        object: {
          firstName : this.editedItem.firstName,
          lastName: this.editedItem.lastName,
          email: this.editedItem.email,
          password: this.editedItem.password
        },
        id: this.editedItem.id,
        editIndex: this.editedIndex,
        urlPath: "/api/Users/",
        resetItem: "resetUsers", 
        setItem: "setUsers",
        addNewItem: "addNewUser",
        updateItem: "updateUser",
        deleteItem: "deleteUser",
        messeges: {
          addItem: "user Added",
          updateItem: "user Updated",
          deleteItem: "user Deleted"
        }
      }
    },
    save() {
      console.log("save");
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.editedIndex > -1) {
          this.$store.dispatch('updateItem', this.getMainObject())
        } else {
          this.$store.dispatch('saveItem', this.getMainObject())
        }
        this.addMood = false
        this.close()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.category-table-section {
  width: 100%;
}
</style>
