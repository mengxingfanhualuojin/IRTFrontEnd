<template>
  <div id="viz"></div>
</template>

<script>
import NeoVis from 'neovis.js';
var viz;
export default {
name: "NeovisDemo",
  mounted:function () {
  this.draw();
  },
  methods:{
    draw() {
      var config = {
        container_id: "viz",
        server_url: "bolt://localhost:7687",
        server_user: "neo4j",
        server_password: "chenzhong",
        labels: {
          "Character": {
            "caption": "name",
            "size": "pagerank",
            "community": "community",
            // "title_properties": [
            //   "name",
            //   "pagerank"
            // ]
          }
        },
        relationships: {
          "INTERACTS": {
            "thickness": "weight",
            "caption": true
          }
        },
        arrows:true,
        initial_cypher: "MATCH (n)-[r:INTERACTS]->(m) RETURN *"
      };

      viz = new NeoVis(config);
      viz.render();
    }
  }
}
</script>

<style scoped>
#viz {
  width: 900px;
  height: 700px;
  border: 1px solid lightgray;
  font: 22pt arial;
}
</style>
