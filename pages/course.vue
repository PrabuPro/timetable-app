<template>
  <div class="category-table-section" style="width: 80%">
    <v-data-table
      :headers="headers"
      :items="courses"
      :items-per-page="10"
      class="elevation-1 mt-5"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>courses</v-toolbar-title>
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
                New Cource
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Cource Registry</span>
              </v-card-title>

              <form>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Cource Title"
                          v-model="$v.editedItem.Title.$model"
                          :error-messages="courceTitleValidation"
                          required
                          @input="$v.editedItem.Title.$touch()"
                          @blur="$v.editedItem.Title.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Teacher CreditPoints"
                          v-model="$v.editedItem.CreditPoints.$model"
                          :error-messages="courceCreditPointsValidation"
                          required
                          @input="$v.editedItem.CreditPoints.$touch()"
                          @blur="$v.editedItem.CreditPoints.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        >
                    
                        <v-select
                        :items="teachers"
                        label="Teacher"
                        v-model="$v.editedItem.Teacher.$model"
                        :error-messages="courceTeacherValidation"
                        required
                        @input="$v.editedItem.Teacher.$touch()"
                        @blur="$v.editedItem.Teacher.$touch()"
                        item-text="Name"
                        item-value="TeacherId"
                      
                        ></v-select>
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
    await this.$store.dispatch('getItems', this.getTeacherObject());
    await this.$store.dispatch('getItems', this.getMainObject());
    this.loading = false;
  },
  computed: {
    ...mapState([ 'courses','teachers' ]),

    courceTitleValidation() {
      const errors = []
      if (!this.$v.editedItem.Title.$dirty) return errors
      !this.$v.editedItem.Title.required &&
        errors.push('Cource Title is required.')
      return errors
    },
    courceCreditPointsValidation() {
      const errors = []
      if (!this.$v.editedItem.CreditPoints.$dirty) return errors
      !this.$v.editedItem.CreditPoints.required && errors.push('Cource CreditPoints is required.')
      return errors
    },
    courceTeacherValidation() {
      const errors = []
      if (!this.$v.editedItem.Teacher.$dirty) return errors
      !this.$v.editedItem.Teacher.required && errors.push('Years of experience is required.')
      return errors
    }
  },
  data() {
    return {
      loading:true,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Title', align: 'center', value: 'Title' },
        { text: 'Credit Points', align: 'center', value: 'CreditPoints' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        CourseId: '',
        Title: '',
        CreditPoints: '',
        Teacher: '',
      },
      defaultItem: {
        CourseId: '',
        Title: '',
        CreditPoints: '',
        Teacher: '',
      },
    }
  },
  validations: {
    editedItem: {
      Title: { required },
      CreditPoints: { required },
      Teacher: { required },
    },
  },
 
  methods: {
    newJob() {},
    editItem(item) {
      console.log('edit item', item)
      this.editedIndex = this.courses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.courses.indexOf(item)
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
          Title : this.editedItem.Title,
          CreditPoints: this.editedItem.CreditPoints,
          Teacher: {
            TeacherId: this.editedItem.Teacher.TeacherId == null ? this.editedItem.Teacher : this.editedItem.Teacher.TeacherId 
          },
        },
        id: this.editedItem.CourseId,
        editIndex: this.editedIndex,
        urlPath: "/api/Courses/",
        resetItem: "resetCourses", 
        setItem: "setCourses",
        addNewItem: "addNewCourse",
        updateItem: "updateCourse",
        deleteItem: "deleteCourse",
        messeges: {
          addItem: "course Added",
          updateItem: "course Updated",
          deleteItem: "course Deleted"
        }
      }
    },
    getTeacherObject() {
      return {
        urlPath: "/api/Teachers/",
        resetItem: "resetTeachers", 
        setItem: "setTeachers",
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
