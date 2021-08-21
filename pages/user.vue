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
                          v-model="$v.editedItem.FirstName.$model"
                          :error-messages="FirstNameValidation"
                          required
                          @input="$v.editedItem.FirstName.$touch()"
                          @blur="$v.editedItem.FirstName.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Last Name"
                          v-model="$v.editedItem.LastName.$model"
                          :error-messages="LastNameValidation"
                          required
                          @input="$v.editedItem.LastName.$touch()"
                          @blur="$v.editedItem.LastName.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Email"
                          v-model="$v.editedItem.Email.$model"
                          :error-messages="EmailValidation"
                          required
                          @input="$v.editedItem.Email.$touch()"
                          @blur="$v.editedItem.Email.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="6"
                          >
                             <v-select
                              :items="userList"
                              v-model="editedItem.UserType"
                              label="User Type"
                            ></v-select>
                      </v-col>
                      
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Password"
                          v-model="$v.editedItem.Password.$model"
                          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show ? 'text' : 'Password'"
                          :error-messages="PasswordValidation"
                          required
                          @input="$v.editedItem.Password.$touch()"
                          @blur="$v.editedItem.Password.$touch()"
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

    FirstNameValidation() {
      const errors = []
      if (!this.$v.editedItem.FirstName.$dirty) return errors
      !this.$v.editedItem.FirstName.required &&
        errors.push('FirstName is required.')
      return errors
    },
    LastNameValidation() {
      const errors = []
      if (!this.$v.editedItem.LastName.$dirty) return errors
      !this.$v.editedItem.LastName.required &&
        errors.push('LastName is required.')
      return errors
    },
    EmailValidation() {
      const errors = []
      if (!this.$v.editedItem.Email.$dirty) return errors
      !this.$v.editedItem.Email.required && errors.push('Email is required.')
      return errors
    },
    PasswordValidation() {
      const errors = []
      if (!this.$v.editedItem.Password.$dirty) return errors
      !this.$v.editedItem.Password.required && errors.push('Password is required.')
      return errors
    }
  },
  data() {
    return {
      show: false,
      loading:true,
      dialog: false,
      dialogDelete: false,
      userList: ['Admin', 'User'],
      headers: [
        { text: 'First Name', align: 'center', value: 'FirstName' },
        { text: 'Last Name', align: 'center', value: 'LastName' },
        { text: 'Email', align: 'center', value: 'Email' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false },
      ],
      userType: "",
      editedIndex: -1,
      editedItem: {
        Id: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        UserType: ''
      },
      defaultItem: {
        Id: '',
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        UserType: ''
      },
    }
  },
  validations: {
    editedItem: {
      FirstName: { required },
      LastName: { required },
      Email: { required },
      Password: { required }
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
          FirstName : this.editedItem.FirstName,
          LastName: this.editedItem.LastName,
          Email: this.editedItem.Email,
          Password: this.editedItem.Password,
          UserType: this.editedItem.UserType
        },
        id: this.editedItem.Id,
        editIndex: this.editedIndex,
        urlPath: "/api/User/",
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
