<template>
  <div>
    <table class="table table-bordered table-striped" v-if="this.homeworld">
      <tr>
        <th>Name</th>
        <td>{{ homeworld.name }}</td>
      </tr>
      <tr>
        <th>Rotation Period</th>
        <td>{{ homeworld.rotation_period }}</td>
      </tr>
      <tr>
        <th>Orbital Period</th>
        <td>{{ homeworld.orbital_period }}</td>
      </tr>
      <tr>
        <th>Diameter</th>
        <td>{{ homeworld.diameter }}</td>
      </tr>
      <tr>
        <th>Climate</th>
        <td>{{ homeworld.climate }}</td>
      </tr>
      <tr>
        <th>Gravity</th>
        <td>{{ homeworld.gravity }}</td>
      </tr>
      <tr>
        <th>Terrain</th>
        <td>{{ homeworld.terrain }}</td>
      </tr>
      <tr>
        <th>Surface Water</th>
        <td>{{ homeworld.surface_water }}</td>
      </tr>
      <tr>
        <th>Population</th>
        <td>{{ homeworld.population }}</td>
      </tr>
      <tr>
        <th>Residents</th>
        <td>
          <span
            v-if="
              !homeworld.residents_data || homeworld.residents_data.length <= 0
            "
            ><font-awesome-icon
              :icon="['fas', 'spinner']"
              reverse
              class="icon alt"
          /></span>
          <span
            v-for="(resident, index) in homeworld.residents_data"
            :key="index"
            ><router-link
              :to="{ name: 'peopleProfile', params: { url: resident.url } }"
              >{{ resident.name }}</router-link
            >,</span
          >
        </td>
      </tr>
      <tr>
        <th>Films</th>
        <td>
          <span v-if="!homeworld.films_data || homeworld.films_data.length <= 0"
            ><font-awesome-icon
              :icon="['fas', 'spinner']"
              reverse
              class="icon alt"
          /></span>
          <span v-for="(film, index) in homeworld.films_data" :key="index"
            ><router-link :to="{ name: 'film', params: { url: film.url } }">{{
              film.title
            }}</router-link
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
      this.homeworld.residents.forEach((resident) => {
        this.peopleApi(resident).then((res) => {
          this.homeworld.residents_data.push(res.data);
          this.$forceUpdate();
        });
      });
    },
    getFilms() {
      this.homeworld.films.forEach((film) => {
        this.filmApi(film).then((res) => {
          this.homeworld.films_data.push(res.data);
          this.$forceUpdate();
        });
      });
    },
    getHomeworld() {
      this.homeworldApi(this.url).then((res) => {
        this.homeworld = res.data;
        this.homeworld.residents_data = [];
        this.homeworld.films_data = [];
        this.getPeople();
        this.getFilms();
      });
    },
  },
  created() {
    this.url = this.$route.params.url;
  },
  mounted() {
    this.getHomeworld();
  },
};
</script>