<template>
  <div class="category-table-section" style="width: 80%">
    <v-data-table
      :headers="headers"
      :items="studentCourses"
      :items-per-page="10"
      class="elevation-1 mt-5"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>StudentCource</v-toolbar-title>
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
                new Studnet Course
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Studnet Course</span>
              </v-card-title>

              <form>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        >
                    
                        <v-select
                        :items="students"
                        label="Students"
                        v-model="$v.editedItem.Student.$model"
                        :error-messages="StudentValidation"
                        required
                        @input="$v.editedItem.Student.$touch()"
                        @blur="$v.editedItem.Student.$touch()"
                        item-text="Name"
                        item-value="StudentId"
                      
                        ></v-select>
                      </v-col>
   
                    <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        >
                    
                        <v-select
                        :items="courses"
                        label="Course"
                        v-model="$v.editedItem.Course.$model"
                        :error-messages="CourseValidation"
                        required
                        @input="$v.editedItem.Course.$touch()"
                        @blur="$v.editedItem.Course.$touch()"
                        item-text="Title"
                        item-value="CourseId"
                      
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
    await this.$store.dispatch('getItems', this.getStudentObject());
    await this.$store.dispatch('getItems', this.getCourseObject());
    await this.$store.dispatch('getItems', this.getMainObject());
    this.loading = false;
  },
  computed: {
    ...mapState(['studentCourses', 'students', 'courses' ]),

    StudentValidation() {
      const errors = []
      if (!this.$v.editedItem.Student.$dirty) return errors
      !this.$v.editedItem.Student.required &&
        errors.push('Place Student is required.')
      return errors
    },
    CourseValidation() {
      const errors = []
      if (!this.$v.editedItem.Course.$dirty) return errors
      !this.$v.editedItem.Course.required && errors.push('Course is required.')
      return errors
    }
  },
  data() {
    return {
      loading:true,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Student', align: 'center', value: 'Student.Name' },
        { text: 'Course', align: 'center', value: 'Course.Title' },
        { text: 'Actions', value: 'actions', align: 'center', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        StudentCourseId: '',
        Student: '',
        Course: '',
      },
      defaultItem: {
        StudentCourseId: '',
        Student: '',
        Course: '',
      },
    }
  },
  validations: {
    editedItem: {
      Student: { required },
      Course: { required },
    },
  },
 
  methods: {
    newJob() {},
    editItem(item) {
      console.log('edit item', item)
      this.editedIndex = this.studentCourses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.studentCourses.indexOf(item)
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
          StudentId : this.editedItem.Student.StudentId == null ? this.editedItem.Student : this.editedItem.Student.StudentId,
          Course: {
            CourseId: this.editedItem.Course.CourseId == null ? this.editedItem.Course : this.editedItem.Course.CourseId
          },
        },
        id: this.editedItem.StudentCourseId,
        editIndex: this.editedIndex,
        urlPath: "/api/StudentCourses/",
        resetItem: "resetStudentCourses", 
        setItem: "setStudentCourses",
        addNewItem: "addNewStudentCourse",
        updateItem: "updateStudentCourse",
        deleteItem: "deleteStudentCourse",
        messeges: {
          addItem: "StudentCourse Added",
          updateItem: "StudentCourse Updated",
          deleteItem: "StudentCourse Deleted"
        }
      }
    },
     getCourseObject() {
      return {
        urlPath: "/api/Courses/",
        resetItem: "resetCourses", 
        setItem: "setCourses",
      }
    },
     getStudentObject() {
      return {
        urlPath: "/api/Students/",
        resetItem: "resetStudents", 
        setItem: "setStudents",
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
