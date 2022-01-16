<template>
  <div>
    <table class="table table-bordered table-striped" v-if="this.people">
      <tr>
        <th>Name</th>
        <td>{{ people.height }}</td>
      </tr>
      <tr>
        <th>Height</th>
        <td>{{ people.name }}</td>
      </tr>
      <tr>
        <th>Mass</th>
        <td>{{ people.mass }}</td>
      </tr>
      <tr>
        <th>Hair Color</th>
        <td>{{ people.hair_color }}</td>
      </tr>
      <tr>
        <th>Skin Color</th>
        <td>{{ people.skin_color }}</td>
      </tr>
      <tr>
        <th>Eye Color</th>
        <td>{{ people.eye_color }}</td>
      </tr>
      <tr>
        <th>Birth Year</th>
        <td>{{ people.birth_year }}</td>
      </tr>
      <tr>
        <th>Gender</th>
        <td>{{ people.gender }}</td>
      </tr>
      <tr v-if="homeworld">
        <th>Homeworld</th>
        <td>
          <router-link
            :to="{ name: 'homeworld', params: { url: people.homeworld } }"
            >{{ homeworld.name }}</router-link
          >
        </td>
      </tr>
      <tr>
        <th>Films</th>
        <td>
          <span v-if="!people.films_data || people.films_data.length <= 0"
            ><font-awesome-icon
              :icon="['fas', 'spinner']"
              reverse
              class="icon alt"
          /></span>
          <span v-for="(film, index) in people.films_data" :key="index"
            ><router-link :to="{ name: 'film', params: { url: film.url } }">{{
              film.title
            }}</router-link
            >,</span
          >
        </td>
      </tr>
      <tr>
        <th>Speices</th>
        <td>
          <span v-if="!people.species_data || people.species_data.length <= 0"
            ><font-awesome-icon
              :icon="['fas', 'spinner']"
              reverse
              class="icon alt"
          /></span>
          <span v-for="(speice, index) in people.species_data" :key="index"
            ><router-link
              :to="{ name: 'speices', params: { url: speice.url } }"
              >{{ speice.name }}</router-link
            >,</span
          >
        </td>
      </tr>
      <tr>
        <th>vehicles</th>
        <td>
          <span v-if="!people.vehicles_data || people.vehicles_data.length <= 0"
            ><font-awesome-icon
              :icon="['fas', 'spinner']"
              reverse
              class="icon alt"
          /></span>
          <span v-for="(vehicle, index) in people.vehicles_data" :key="index"
            ><router-link
              :to="{ name: 'vehicles', params: { url: vehicle.url } }"
              >{{ vehicle.name }}</router-link
            >,</span
          >
        </td>
      </tr>
      <tr>
        <th>Starships</th>
        <td>
          <span
            v-if="!people.starships_data || people.starships_data.length <= 0"
            ><font-awesome-icon
              :icon="['fas', 'spinner']"
              reverse
              class="icon alt"
          /></span>
          <span v-for="(starship, index) in people.starships_data" :key="index"
            ><router-link
              :to="{ name: 'starships', params: { url: starship.url } }"
              >{{ starship.name }}</router-link
            >,</span
          >
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import StarwarMixin from "@/mixin/StarwarMixin";
export default {
  mixins: [StarwarMixin],
  data() {
    return {
      url: null,
      people: null,
      homeworld: null,
    };
  },
  methods: {
    getPeople() {
      this.peopleApi(this.url).then((res) => {
        this.people = res.data;
        this.people.films_data = [];
        this.people.species_data = [];
        this.people.vehicles_data = [];
        this.people.starships_data = [];
        this.getHomeworld();
        this.getFilms();
        this.getSpeices();
        this.getvehicles();
        this.getStarships();
      });
    },
    getHomeworld() {
      this.homeworldApi(this.people.homeworld).then((res) => {
        this.homeworld = res.data;
      });
    },
    getFilms() {
      this.people.films.forEach((film) => {
        this.filmApi(film).then((res) => {
          this.people.films_data.push(res.data);
          this.$forceUpdate();
        });
      });
    },
    getSpeices() {
      this.people.species.forEach((specie) => {
        this.speciesApi(specie).then((res) => {
          this.people.species_data.push(res.data);
          this.$forceUpdate();
        });
      });
    },
    getvehicles() {
      this.people.vehicles.forEach((vehicle) => {
        this.vehicleApi(vehicle).then((res) => {
          this.people.vehicles_data.push(res.data);
          this.$forceUpdate();
        });
      });
    },
    getStarships() {
      this.people.starships.forEach((starship) => {
        this.vehicleApi(starship).then((res) => {
          this.people.starships_data.push(res.data);
          this.$forceUpdate();
        });
      });
    },
  },
  created() {
    this.url = this.$route.params.url;
  },
  mounted() {
    this.getPeople();
  },
};
</script>