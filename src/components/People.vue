<template>
  <div>
    <div class="icon-spinner" v-if="showSpinner">
      <font-awesome-icon :icon="['fas', 'spinner']" reverse class="icon alt" />
    </div>

    <h1>Peoples</h1>
    <div class="row mb-2">
      <div class="form-group col-md-6">
        <input
          type="text"
          v-model="search"
          @keyup="searchPeople()"
          class="form-control"
          placeholder="Search By Name"
        />
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
        <th>Name</th>
        <th>Height</th>
        <th>Mass</th>
        <th>Hair Color</th>
        <th>Skin Color</th>
        <th>Eye Color</th>
        <th>Birth Year</th>
        <th>Gender</th>
        <th>#</th>
      </thead>
      <tbody>
        <tr
          v-if="peopleResult.count > 0"
          v-for="(people, index) in peopleResult.results"
          :key="index"
        >
          <td>
            <span v-if="!people.species_icon"
              ><font-awesome-icon
                :icon="['fas', 'spinner']"
                reverse
                class="icon alt"
            /></span>
            <span v-else>
              <font-awesome-icon
                v-if="people.species_icon.name == 'Droid'"
                :icon="['fas', 'mobile']"
              />
              <font-awesome-icon
                v-else-if="people.species_icon.name == 'Human'"
                :icon="['fas', 'user-circle']"
              />
              <font-awesome-icon v-else :icon="['fas', 'question']" />
            </span>
            {{ people.name }}
          </td>
          <td>{{ people.height }}</td>
          <td>{{ people.mass }}</td>
          <td>{{ people.hair_color }}</td>
          <td>{{ people.skin_color }}</td>
          <td>{{ people.eye_color }}</td>
          <td>{{ people.birth_year }}</td>
          <td>{{ people.gender }}</td>
          <td>
            <router-link
              :to="{ name: 'peopleProfile', params: { url: people.url } }"
              >View Details</router-link
            >
          </td>
        </tr>
        <tr v-else>
          <td colspan="10" align="center">
            <font-awesome-icon
              :icon="['fas', 'exclamation-triangle']"
              class="icon alt"
            />
            No data found
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button
        class="btn btn-primary"
        :disabled="!peopleResult.previous"
        v-if="peopleResult.count > 0"
        @click="prevPage()"
      >
        Prev
      </button>
      <button
        class="btn btn-primary"
        :disabled="!peopleResult.next"
        v-if="peopleResult.count > 0"
        @click="nextPage()"
      >
        Next
      </button>
    </div>
  </div>
</template>
<script>
import { config } from "@/config";
import debounce from "lodash/debounce";
export default {
  data() {
    return {
      peopleResult: {},
      page: 1,
      search: null,
      showSpinner: false,
    };
  },
  watch: {
    page() {
      this.getPeoples();
    },
  },
  methods: {
    nextPage() {
      this.page = this.page + 1;
    },
    prevPage() {
      this.page = this.page - 1;
    },
    reset() {
      this.page = 1;
      this.getPeoples();
    },
    searchPeople: debounce(function () {
      this.reset();
    }, 300),
    getPeoples() {
      this.showSpinner = true;
      const params = { page: this.page };
      if (this.search) {
        params.search = this.search;
      }
      axios
        .get(`${config.baseUrl}people`, { params })
        .then((res) => {
          this.peopleResult = res.data;
          this.showSpinner = false;
          this.getSpecies();
        })
        .catch((error) => {
          console.log(error);
          this.showSpinner = false;
        });
    },
    getSpecies() {
      this.peopleResult.results.map((result) => {
        axios.get(result.species[0]).then((response) => {
          result.species_icon = response.data;
          this.$forceUpdate();
        });
      });
    },
  },
  mounted() {
    this.getPeoples();
  },
};
</script>
<style>
.icon-spinner {
  position: absolute;
  left: 49%;
  top: 49%;
}
</style>