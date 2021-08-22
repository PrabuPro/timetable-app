<template>
  <div class="category-table-section" style="width: 80%">
    <v-data-table
      :headers="headers"
      :items="students"
      :items-per-page="10"
      class="elevation-1 mt-5"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Students</v-toolbar-title>
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
                New Student
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Student Registry</span>
              </v-card-title>

              <form>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Student Name"
                          v-model="$v.editedItem.Name.$model"
                          :error-messages="studentNameValidation"
                          required
                          @input="$v.editedItem.Name.$touch()"
                          @blur="$v.editedItem.Name.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Student Sur Name"
                          v-model="$v.editedItem.SurName.$model"
                          :error-messages="studentSurNameValidation"
                          required
                          @input="$v.editedItem.SurName.$touch()"
                          @blur="$v.editedItem.SurName.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="DOB"
                          placeholder="MM/DD/YYYY"
                          v-model="$v.editedItem.DateOfBirth.$model"
                          :error-messages="studentDateOfBirthValidation"
                          required
                          @input="$v.editedItem.DateOfBirth.$touch()"
                          @blur="$v.editedItem.DateOfBirth.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Email"
                          v-model="$v.editedItem.Email.$model"
                          :error-messages="studentemailValidation"
                          required
                          email
                          @input="$v.editedItem.Email.$touch()"
                          @blur="$v.editedItem.Email.$touch()"
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
    ...mapState(['students' ]),

    studentNameValidation() {
      const errors = []
      if (!this.$v.editedItem.Name.$dirty) return errors
      !this.$v.editedItem.Name.required &&
        errors.push('Student name is required.')
      return errors
    },
    studentSurNameValidation() {
      const errors = []
      if (!this.$v.editedItem.SurName.$dirty) return errors
      !this.$v.editedItem.SurName.required && errors.push('Student Sur name is required.')
      return errors
    },
    studentDateOfBirthValidation() {
      const errors = []
      if (!this.$v.editedItem.DateOfBirth.$dirty) return errors
      !this.$v.editedItem.DateOfBirth.required && errors.push('DOB is required.')
      return errors
    },
    studentemailValidation() {
      const errors = []
      if (!this.$v.editedItem.Email.$dirty) return errors
      !this.$v.editedItem.Email.required && errors.push('Email is required.')
      return errors
    },
  },
  data() {
    return {
      loading:true,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Name', align: 'center', value: 'Name' },
        { text: 'Sur Name', align: 'center', value: 'SurName' },
        { text: 'DOB', align: 'center', value: 'DateOfBirth' },
        { text: 'Email', align: 'center', value: 'Email' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        StudentId: '',
        Name: '',
        SurName: '',
        DateOfBirth: '',
        Email: '',
      },
      defaultItem: {
        StudentId: '',
        Name: '',
        SurName: '',
        DateOfBirth: '',
        Email: '',
      },
    }
  },
  validations: {
    editedItem: {
      Name: { required },
      SurName: { required },
      DateOfBirth: { required },
      Email: { required },
    },
  },
 
  methods: {
    newJob() {},
    editItem(item) {
      console.log('edit item', item)
      this.editedIndex = this.students.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.students.indexOf(item)
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
          Name : this.editedItem.Name,
          SurName: this.editedItem.SurName,
          DateOfBirth: this.editedItem.DateOfBirth,
          Email: this.editedItem.Email
        },
        id: this.editedItem.StudentId,
        editIndex: this.editedIndex,
        urlPath: "/api/Students/",
        resetItem: "resetStudents", 
        setItem: "setStudents",
        addNewItem: "addNewStudent",
        updateItem: "updateStudent",
        deleteItem: "deleteStudent",
        messeges: {
          addItem: "student Added",
          updateItem: "student Updated",
          deleteItem: "student Deleted"
        }
      }
    },
    save() {
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
