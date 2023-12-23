<template>
  <div>
 

    <b-container class="bv-example-row index_notes_header">
        <b-row>
            <b-col>
                <b-form-input v-model="filter" placeholder="Ingrese texto de filtrado"></b-form-input>
            </b-col>
            <b-col class="index_notes_header__button">
                <b-button variant="primary"  @click="searchNotes" >Buscar</b-button>
            </b-col>
        
        </b-row>
    </b-container>

    <b-row  v-if="notes.length == 0">
      <b-col lg="12">
        <b-card >
          <p>No hay resultados</p>
        </b-card>
      </b-col>
    </b-row>

    <b-row else> 
      <b-col v-for="(note, index) in notes" :key="index" lg="4">
        <b-card :title="note.title" :sub-title="formattedDate(note.date)">
          <p>{{ note.content }}</p>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: [],
      filter: "",
    };
  },
  created() {
    this.getNotes();
  },
  watch: {
    filter(newValue) {
      if (newValue === '') {
        this.getNotes();
      }
    }
  },
  methods: {
    formattedDate(date) {
      return this.$moment(date).locale("es").format("MMMM Do YYYY, h:mm:ss a");
    },

    getNotes() {
      this.notes = [];

      this.$vs.loading({
        type: "border",
      });

      this.$http({
        url: "note/getNotes",
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Authorization: "Bearer " + process.env.VUE_APP_API_TOKEN,
        },
      })
        .then((response) => {
          this.$vs.loading.close();

          this.notes = response.data.data;

          console.log("this.notes", this.notes);
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.error("Error fetching data:", error.response.data.message);
        });
    },

    searchNotes() {
      if (this.filter == "") {
        this.$vs.notify({
          time: 5000,
          title: "Debes agregar una palabra para filtrar notas",
          color: "danger",
          position: "bottom-center",
        });
      } else {
        this.$vs.loading({
          type: "border",
        });

        this.$http({
          url: "note/searchNote",
          method: "POST",
          data: {
            search_query: this.filter,
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            Authorization: "Bearer " + process.env.VUE_APP_API_TOKEN,
          },
        })
          .then((response) => {
            console.log(response.data.data.results);
            this.$vs.loading.close();

            this.notes = [];
            this.notes = response.data.data.results;

            if (this.notes.length < 0) {
              this.$vs.notify({
                time: 5000,
                title: "No se encontraron resultados",
                color: "warning",
                position: "bottom-center",
              });
            }
          })
          .catch((error) => {
            this.$vs.loading.close();
            this.$vs.notify({
              time: 5000,
              title: "Error al buscar notas",
              color: "danger",
              position: "bottom-center",
            });

            console.error("Error fetching data:", error.response.data.message);
          });
      }
    },
  },
};
</script>
