<template>
  <b-container>
    <b-row>
      <b-col></b-col>
      <b-col md="8">
        <b-input-group>
          <b-form-input v-model="urls.longUrl" size="lg" type="url" placeholder="Enter url"></b-form-input>
          <b-input-group-append>
            <b-button class="shortenUlrBtn" size="lg" variant="success" @click="sendUrl">Shorten</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row class="p-3">
      <b-col></b-col>
      <b-col sm="8">
        <input id="copyUrlink" name="customfield" class="hdnInput" :value="urls.shortUrl">
        <b-link
          v-if="urls.shortUrl"
          target="_blank"
          class="text-break urlText"
          :href="urls.shortUrl"
        >{{urls.shortUrl}}</b-link>
        <b-button v-if="isHidden" class="copyUrlBtn ml-5" title="Coppy" @click="copyURL" v-b-tooltip.focus="'copied'" >
          <b-icon icon="files"></b-icon>
        </b-button>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col md="8">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Url</th>
              <th scope="col">Shorten</th>
              <th scope="col">Repeated</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td class="tableData">
                <b-link class="longUrl" :href="item.shortUrl" target="_blank">{{item.longUrl}}</b-link>
              </td>
              <td>
                <b-link :href="item.shortUrl" target="_blank">{{item.shortUrl}}</b-link>
              </td>
              <td>{{item.repeated}}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import UrlService from "@/services/urlsService";

export default {
  name: "UrlComponent",
  data() {
    return {
      isHidden: false,
      urls: {
        longUrl: null,
        shortUrl: null,
      },
      items: [],
    };
  },
  mounted() {
    this.getUrl();
  },
  methods: {
    
    //Post long url to the server
    async sendUrl() {
      try {
        await UrlService.post(this.urls).then((res) => {
          this.urls.shortUrl = res.data;
          this.isHidden= true;
        });
      } catch (err) {
        console.log(err);
      }
    },
    //Get the list of urls , shoturls and counter
    async getUrl() {
      try {
        this.items = (await UrlService.get()).data;
      } catch (err) {
        console.log(err);
      }
    },
    //copy shortUrl on clipboard button
    copyURL() {
      
      let copyText = document.getElementById("copyUrlink");
      copyText.select();
      document.execCommand("copy");
      
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.urlText {
  font-size: 24px;
}
.copyUrlBtn {
  font-size: 24px;
  background-color: transparent;
  color: black;
  border: none;
}
.copyUrlBtn:hover {
  color: rgb(134, 133, 133);
  border: none;
  background-color: transparent;
}
.copyUrlBtn:active,
.copyUrlBtn:focus,
.copyUrlBtn:focus-within,
.copyUrlBtn:visited {
  color: black !important;
  border: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
}
.longUrl {
  color: black;
}
.tableData {
  word-break: break-word;
}
.hdnInput{
  opacity: 0;
  width: 1px;
}
</style>
