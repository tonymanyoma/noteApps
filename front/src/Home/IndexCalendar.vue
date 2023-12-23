<template>
  <div>
    <b-row>
      <b-col class="index_calendar_header">
        <vue-country-code
          @onSelect="onSelectCountry"
          :preferredCountries="['vn', 'us', 'gb']"
        >
        </vue-country-code>
      </b-col>
    </b-row>

    <vue-scheduler
      :labels="labels"
      event-display="name"
      :available-views="['month', 'week', 'day']"
      initial-view="month"
      :show-today-button="false"
      :event-dialog-config="dialogConfig"
      @event-created="submitNote"
      @event-clicked="openNote"
      @month-changed="monthChanged"
      :events="notes"
    />

    <b-modal v-model="show" title="Editar Nota" ok-only ok-title="Cerrar">
      <b-form-group label="Título">
        <b-form-input v-model="note.title"></b-form-input>
      </b-form-group>

      <b-form-group label="Contenido">
        <b-form-textarea v-model="note.content"></b-form-textarea>
      </b-form-group>

      <b-form-group label="Hora">
        <b-form-input type="time" v-model="note.time"></b-form-input>
      </b-form-group>

      <b-button type="submit" @click="updateNote()" variant="primary"
        >Guardar</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogConfig: {
        title: "Nueva nota",
        createButtonLabel: "Crear",
        enableTimeInputs: false,
        fields: [
          {
            name: "title",
            label: "Titulo",
            type: "text",
            required: true,
          },
          {
            name: "content",
            type: "textarea",
            required: true,
            label: "Contenido",
          },
          {
            name: "time",
            type: "time",
            required: true,
            label: "Hora",
          },
        ],
      },
      labels: {
        today: "Hoy",
        back: "Atrás",
        next: "Siguiente",
        month: "Mes",
        week: "Semana",
        day: "Día",
        all_day: "Todo el día",
      },
      notes: [],
      show: false,
      note: {
        id: "",
        title: "",
        content: "",
        time: "",
        date: "",
      },
      countyCode: "",
      year: "",
    };
  },

  created() {
    this.getNotes();
  },

  methods: {
    monthChanged(event) {
      this.year = this.$moment(event).format("YYYY");
      this.removeHolidays();
      this.loadHolidays();
    },

    removeHolidays() {
      this.notes = this.notes.filter((note) => note.isHoliday === false);
    },

    onSelectCountry(event) {
      console.log("country", event);
      if (event.iso2 != this.countyCode) {
        this.countyCode = event.iso2;
        this.removeHolidays();
        this.loadHolidays();
      }
    },

    loadHolidays() {
      this.$http({
        url: `https://date.nager.at/api/v3/PublicHolidays/${this.year}/${this.countyCode}`,
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
      })
        .then((response) => {
          var holidays = response.data.map((day) => {
            return {
              date: new Date(day.date),
              startTime: "00:00",
              //   endTime: "15:00",
              name: day.localName,
              color: "#76B7F1",
              isHoliday: true,
            };
          });

          this.notes = this.notes.concat(holidays);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.response.data.message);
        });
    },

    openNote(event) {
      console.log("event", event);
      if (!event.isHoliday) {
        this.note.id = event.id;
        this.note.title = event.name;
        this.note.content = event.content;
        this.note.time = event.startTime;
        this.note.date = event.date;
        this.show = true;
      }
    },

    updateNote() {
      if (
        this.note.title == "" ||
        this.note.time == "" ||
        this.note.content == ""
      ) {
        this.$vs.notify({
          time: 5000,
          title: "Los campos no pueden ir vacios",
          color: "danger",
          position: "bottom-center",
        });
      } else {
        this.$vs.loading({
          type: "border",
        });

        console.log("event---", event);

        const formattedDate = this.$moment(this.note.date).format("YYYY-MM-DD"); // Formatear la fecha
        const formattedTime = this.$moment(this.note.time).format("HH:mm:ss"); // Formatear la hora

        // Combinar la fecha y la hora formateadas para crear un datetime
        const formattedDateTime = `${formattedDate} ${this.note.time}`;

        this.$http({
          url: "note/updateNote",
          method: "POST",
          data: {
            id: this.note.id,
            date: formattedDateTime,
            title: this.note.title,
            content: this.note.content,
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            Authorization: "Bearer " + process.env.VUE_APP_API_TOKEN,
          },
        })
          .then((response) => {
            console.log(response.data);
            this.$vs.loading.close();

            this.$vs.notify({
              time: 5000,
              title: "Nota actualizada exitosamente",
              color: "success",
              position: "bottom-center",
            });
            this.getNotes();
          })
          .catch((error) => {
            this.$vs.loading.close();
            this.$vs.notify({
              time: 5000,
              title:
                "Error al actualizar la nota " + error.response.data.message,
              color: "danger",
              position: "bottom-center",
            });

            console.error("Error fetching data:", error.response.data.message);
          });
      }
    },

    submitNote(event) {
      this.$vs.loading({
        type: "border",
      });

      console.log("event---", event);

      const formattedDate = this.$moment(event.date).format("YYYY-MM-DD"); // Formatear la fecha
      const formattedTime = this.$moment(event.time).format("HH:mm:ss"); // Formatear la hora

      // Combinar la fecha y la hora formateadas para crear un datetime
      const formattedDateTime = `${formattedDate} ${formattedTime}`;

      this.$http({
        url: "note/createNote",
        method: "POST",
        data: {
          date: formattedDateTime,
          title: event.title,
          content: event.content,
          //   time: event.time,
          //   timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          Authorization: "Bearer " + process.env.VUE_APP_API_TOKEN,
        },
      })
        .then((response) => {
          console.log(response.data);
          this.$vs.loading.close();

          this.$vs.notify({
            time: 5000,
            title: "Nota creada exitosamente",
            color: "success",
            position: "bottom-center",
          });
          this.getNotes();
        })
        .catch((error) => {
          this.$vs.loading.close();
          this.$vs.notify({
            time: 5000,
            title: "Error al crear la nota " + error.response.data.message,
            color: "danger",
            position: "bottom-center",
          });

          console.error("Error fetching data:", error.response.data.message);
        });
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

          this.notes = response.data.data.map((note) => {
            const dateObj = this.$moment(note.date);

            const startTime = dateObj.format("HH:mm");

            return {
              id: note.id,
              date: new Date(note.date),
              startTime: startTime,
              //   endTime: "15:00",
              content: note.content,
              name: note.title,
              color: "#1bc155",
              isHoliday: false,
            };
          });
        })
        .catch((error) => {
          this.$vs.loading.close();
          console.error("Error fetching data:", error.response.data.message);
        });
    },
  },
};
</script>

<style scoped></style>
